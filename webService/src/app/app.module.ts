import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { ListarComponent } from './pages/listar/listar.component';
import  {HttpClientModule} from '@angular/common/http'; //Importar el cliente
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    ListarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
