import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArtistaService } from "../servicios/artista.service";
import { CancionService } from "../servicios/cancion.service";

import { Artista } from "../interfaz/artista";
import { CancionPrincipal } from '../interfaz/cancion-principal';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {  
  artista: Artista = {
    id:-1,
    nombre:"Indefinido",
    foto:"url",
    albumesDeArtista:[]
  }

  numeroCanciones: number = 0;
  canciones:CancionPrincipal[] = [];


  constructor(
    private artistaService: ArtistaService,
    private cancionService: CancionService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.params;
    let id = parseInt(params["id"]);
    this.artistaService.obtenerArtistaPorId(id).subscribe(artistaResp =>{      
      this.artista = artistaResp as Artista;      
    });            

    this.cancionService.obtenerCancionesArtista(id).subscribe(cancionesResp =>{      
      this.numeroCanciones = (cancionesResp as CancionPrincipal[]).length;
      this.canciones = (cancionesResp as CancionPrincipal[]).splice(0, 20);
    });
  }
  
}
