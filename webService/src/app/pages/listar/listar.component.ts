import { Component, OnInit } from '@angular/core';
import { Clientes } from 'src/app/interfaces/clientes';
import { ServiceClientesService } from 'src/app/servicio/service-clientes.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  datosClientes: Clientes[] = [];
  usuarioRegistro = {
    name: '',
    email: '',
    password: '',
  };
  usuarioLogin = {
    email: '',
    password: ''
  };

  constructor(private serviceClients: ServiceClientesService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }
  cargarClientes() {
    this.serviceClients.ConsultarClientes().subscribe(
      (data) => {
        this.datosClientes = data;
      },
      (error) => {
        console.error('Error al cargar', error);
      }
    );
  }

  registrarUsuario() {
    this.serviceClients.register(this.usuarioRegistro).subscribe(
      (response) => {
        console.log('Registro exitoso', response);
        // Manejar el éxito según tus necesidades (por ejemplo, redirección)
      },
      (error) => {
        console.error('Error en el registro', error);
        // Manejar el error según tus necesidades
      }
    );
  }
  iniciarSesion() {
    this.serviceClients.login(this.usuarioLogin).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso', response);
        // Manejar el éxito según tus necesidades (por ejemplo, redirección)
      },
      (error) => {
        console.error('Error en el inicio de sesión', error);
        // Manejar el error según tus necesidades
      }
    );
  }
}
