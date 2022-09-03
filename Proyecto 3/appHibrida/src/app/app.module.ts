import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { FormsModule } from '@angular/forms';


// Componentes
import { PortadaComponent } from './portada/portada.component';
import { PrincipalComponent } from "./principal/principal.component";
import { CancionComponent } from './cancion/cancion.component';
import { AlbumComponent } from './album/album.component';
import { ArtistaComponent } from './artista/artista.component';


// Componentes Angular
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    PortadaComponent,
    PrincipalComponent,
    CancionComponent,
    AlbumComponent,
    ArtistaComponent,
    BusquedaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatSliderModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
