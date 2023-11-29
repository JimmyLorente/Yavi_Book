import { Component, OnInit } from '@angular/core';
import { Clientes } from 'src/app/interfaces/clientes';
import { ServiceClientesService } from 'src/app/services/service-clientes.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  datosClientes: Clientes[] = [];



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



}
