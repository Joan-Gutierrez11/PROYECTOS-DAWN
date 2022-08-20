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
    const minutos = milisegundos / 1000 / 60;
    milisegundos -= minutos * 60 * 1000;
    const segundos = (milisegundos / 1000);
    return `${this.agregarCeroSiEsNecesario(minutos)}:${this.agregarCeroSiEsNecesario(segundos)}`;
  };

}
