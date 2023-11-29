import { Component, OnInit } from '@angular/core';
import { ServiceClientesService } from 'src/app/services/service-clientes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuarioLogin = {
    email: '',
    password: '',
  };
  ngOnInit(): void {}
  constructor(private serviceClients: ServiceClientesService) {}

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
