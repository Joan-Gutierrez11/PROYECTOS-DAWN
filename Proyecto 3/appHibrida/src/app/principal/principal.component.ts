import { Component, OnInit } from '@angular/core';

import { AlbumService } from "../servicios/album.service";
import { CancionService } from "../servicios/cancion.service";

import { Album } from "../interfaz/album";
import { CancionPrincipal } from "../interfaz/cancion-principal";


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  albumes:Album[] = [];
  canciones:CancionPrincipal[] = [];

  constructor(
    private albumService:AlbumService,
    private cancionService:CancionService
  ) { }

  ngOnInit(): void {
    this.albumService.obtenerAlbumes().subscribe(albumRespuesta =>{
      this.albumes = albumRespuesta as Album[];
    });

    this.cancionService.obtenerNumCanciones(20).subscribe(resp =>{
      this.canciones = resp as CancionPrincipal[];
    });
  }

  agregarCeroSiEsNecesario = (valor:number) => {
    if (valor < 10) {
      return "0" + valor;
    } else {
      return "" + valor;
    }
  }
  
  milisegundosAMinutosYSegundos = (milisegundos:number) => {
    let minutes = Math.floor(milisegundos / 60000);
    let seconds = ((milisegundos % 60000) / 1000).toFixed(0);
    return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
  };

  mostrarTituloMinimizado(titulo: string){
    return titulo.length > 15 ? titulo.slice(0, 15) + '...': titulo;
  }

}
