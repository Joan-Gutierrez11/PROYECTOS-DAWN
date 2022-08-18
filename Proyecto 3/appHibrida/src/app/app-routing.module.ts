import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortadaComponent } from "./portada/portada.component";
import { PrincipalComponent } from "./principal/principal.component";
import { CancionComponent } from "./cancion/cancion.component";
import { AlbumComponent } from './album/album.component';
import { ArtistaComponent } from './artista/artista.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const routes: Routes = [
  {path:"portada", component:PortadaComponent},
  {path:"principal", component:PrincipalComponent},
  {path:"cancion", component:CancionComponent},
  {path:"album", component:AlbumComponent},
  {path:"artista", component:ArtistaComponent},
  {path:"busqueda", component:BusquedaComponent},
  {path: "**", redirectTo: "portada" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
