import { Router, Request, Response } from "express";
import { usuarios } from "../data/data";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'
import { User, UserModel } from "../models/usuarios.model";
import bcrypt from "bcryptjs";

const router = Router();

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        roles: string[];
    }
}

router.get("/load", asyncHandler(
    async (req, res) => {
        const userCount = await UserModel.countDocuments();
        if (userCount > 0) {
            res.send("DATOS CARGADO ANTERIORMENTE ");
            return;
        }
        await UserModel.create(usuarios);
        res.send("SE CARGO LOS USUARIOS CON EXITO")
    }))

//verificar usuarios login
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send("Credenciales incorrecta vuelvlo a intentar");
    }
}))

//registrar usuarios
router.post(
    "/register",
    asyncHandler(async (req, res) => {
        const { name, email, password, roles } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(400).send("Usuario ya existe, desea logearse");
            return;
        }
        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser: User = {
            id: "",
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            roles: [],
            token: "",
        };

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
    })
);


// Obtener todos los usuarios
router.get(
    "/users",
    asyncHandler(async (req: Request, res: Response) => {
        const users = await UserModel.find();
        res.send(users);
    })
);

// Obtener un usuario por su ID
router.get(
    "/users/:id",
    asyncHandler(async (req: Request, res: Response) => {
        const user = await UserModel.findById(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(400).send("Usuario no encontrado");
        }
    })
);


// Actualizar un usuario existente
router.put(
    "/users/:id",
    asyncHandler(async (req: Request, res: Response) => {
        const { name, email } = req.body;
        const user = await UserModel.findById(req.params.id);

        if (user) {
            user.name = name;
            user.email = email.toLowerCase();

            await user.save();
            res.send(user);
        } else {
            res.status(400).send("Usuario no encontrado");
        }
    })
);

// Eliminar un usuario
router.delete(
    "/users/:id",
    asyncHandler(async (req: Request, res: Response) => {
        const user = await UserModel.findById(req.params.id);

        if (user) {
            await UserModel.deleteOne({ _id: user._id });
            res.send("Usuario eliminado exitosamente");
        } else {
            res.status(400).send("Usuario no encontrado");
        }
    })
);

//validaciones de tokes y usuarios
const generateTokenResponse = (user: User) => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1d",
        }
    );
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        token: token,
    };
};

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para la gestión de usuarios en la aplicación
 *   x-order: 1  # Orden 1
 */

/**
 * @swagger
 * /usuarios/load:
 *   get:
 *     tags: [Usuarios]
 *     summary: Cargar datos de usuarios
 *     description: Verifica si los datos de usuarios están cargados y, si no, los carga con ejemplos de usuarios.
 *     responses:
 *       200:
 *         description: Datos de usuarios cargados correctamente
 *       500:
 *         description: Error al cargar los datos de usuarios
 */

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     tags: [Usuarios]
 *     summary: Iniciar sesión
 *     requestBody:
 *       description: Credenciales de inicio de sesión
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve el token de acceso
 *       400:
 *         description: Credenciales incorrectas, vuelva a intentarlo
 */

/**
 * @swagger
 * /usuarios/register:
 *   post:
 *     tags: [Usuarios]
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       description: Datos del nuevo usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error al registrar el usuario
 */

/**
 * @swagger
 * /usuarios/users:
 *   get:
 *     tags: [Usuarios]
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error al obtener la lista de usuarios
 */

/**
 * @swagger
 * /usuarios/users/{id}:
 *   get:
 *     tags: [Usuarios]
 *     summary: Obtener información sobre un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del usuario
 *       400:
 *         description: Usuario no encontrado
 *
 *   put:
 *     tags: [Usuarios]
 *     summary: Actualizar información de un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Datos actualizados del usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error al actualizar el usuario
 *       401:
 *         description: Acceso no autorizado
 *
 *   delete:
 *     tags: [Usuarios]
 *     summary: Eliminar un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       400:
 *         description: Error al eliminar el usuario
 *       401:
 *         description: Acceso no autorizado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistration:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - password
 *
 *     UserUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *       required:
 *         - name
 *         - email
 */


export default router