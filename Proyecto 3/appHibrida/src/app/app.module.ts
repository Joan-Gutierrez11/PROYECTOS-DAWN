import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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



@NgModule({
  declarations: [
    AppComponent,
    PortadaComponent,
    PrincipalComponent,
    CancionComponent,
    AlbumComponent,
    ArtistaComponent
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
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
