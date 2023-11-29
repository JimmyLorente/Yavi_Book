import { Component, OnInit } from '@angular/core';
import { ServiceClientesService } from 'src/app/services/service-clientes.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  usuarioRegistro = {
    name: '',
    email: '',
    password: '',
  };
  constructor(private serviceClients: ServiceClientesService) {}
    ngOnInit(): void {
        throw new Error('Method not implemented.');
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

}
