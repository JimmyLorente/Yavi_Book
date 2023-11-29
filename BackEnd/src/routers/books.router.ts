import { Router } from "express";
import { books } from "../data/data";
import asyncHandler from "express-async-handler";
import { BookModel } from "../models/book.model";

const router = Router();

router.get("/load", asyncHandler(
    async (req, res) => {
        const bookCount = await BookModel.countDocuments();
        if (bookCount > 0) {
            res.send("Datos cargado anteriormente");
            return;
        }
        await BookModel.create(books);
        res.send("Se cargo correctamente los datos")
    }))


//obtener todo los libros con metodo GET
router.get("/", asyncHandler(
    async (req, res) => {
        const books = await BookModel.find();
        res.send(books)
    }
))

//obtener un libro por ido metodo GET

router.get("/:bookId", asyncHandler(
    async (req, res) => {
        const book = await BookModel.findById(req.params.bookId);
        res.send(book);
    }
))

//crear un libro por metodo POST

router.post('/', asyncHandler(async(req, res)=>{
    const newBook = req.body;
    const createBook = await BookModel.create(newBook)
    res.send(createBook)
}))

//actualizar un libro por metodo put

router.put('/:bookId', asyncHandler(async(req, res)=>{
    const updateBook = req.body;
    const bookId = req.params.bookId;
    const result = await BookModel.findByIdAndUpdate(bookId, updateBook, {new: true});
    res.send(result)
}))

//eliminar un libro por metodo delete
router.delete('/:bookId', asyncHandler(async ( req, res)=>{
    const bookId = req.params.bookId;
    await BookModel.findByIdAndDelete(bookId);
    res.send('Libro eliminado con exito')
}))

/**
 * @swagger
 * tags:
 *   name: Libros
 *   description: Endpoints para la gestión de libros en la aplicación
 *   x-order: 2  # Orden 2
 */

/**
 * @swagger
 * /libros/load:
 *   get:
 *     tags: [Libros]
 *     summary: Cargar datos de libros
 *     description: Verifica si los datos de libros están cargados y, si no, los carga con ejemplos de libros.
 *     responses:
 *       200:
 *         description: Datos de libros cargados correctamente
 *       500:
 *         description: Error al cargar los datos de libros
 */

/**
 * @swagger
 * /libros:
 *   get:
 *     tags: [Libros]
 *     summary: Obtener todos los libros
 *     responses:
 *       200:
 *         description: Lista de libros
 *       500:
 *         description: Error al obtener la lista de libros
 */

/**
 * @swagger
 * /libros/{bookId}:
 *   get:
 *     tags: [Libros]
 *     summary: Obtener información sobre un libro por ID
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID del libro
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del libro
 *       404:
 *         description: Libro no encontrado
 *
 *   post:
 *     tags: [Libros]
 *     summary: Crear un nuevo libro
 *     requestBody:
 *       description: Datos del nuevo libro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Libro creado exitosamente
 *       500:
 *         description: Error al crear el libro
 *
 *   put:
 *     tags: [Libros]
 *     summary: Actualizar información de un libro por ID
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID del libro
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Datos actualizados del libro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Libro actualizado exitosamente
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error al actualizar el libro
 *
 *   delete:
 *     tags: [Libros]
 *     summary: Eliminar un libro por ID
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID del libro
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Libro eliminado exitosamente
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error al eliminar el libro
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         genre:
 *           type: string
 *         year:
 *           type: number
 *       required:
 *         - title
 *         - author
 *         - genre
 *         - year
 */


export default router