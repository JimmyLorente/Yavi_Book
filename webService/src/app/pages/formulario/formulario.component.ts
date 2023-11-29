import { Component, OnInit } from '@angular/core';
import { Libros } from 'src/app/interfaces/libros';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit{
  datosLibros: Libros [] = 	[];
  agregarLibro = {
    name: '',
    description: '',
    date: '',
    publishing_book: '',
    sections: '',
    imgUrl: '',
  }
  editar
  ngOnInit(): void {
      
  }


}
