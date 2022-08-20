import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlbumService } from "../servicios/album.service";
import { Album } from "../interfaz/album";
import { CancionService } from '../servicios/cancion.service';
import { CancionPrincipal } from "../interfaz/cancion-principal";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  album: Album = {
    id:-1,
    nombre:"Album",
    fecha_publicacion:new Date(),
    imagen:"url",
    artistasDelAlbum:[]
  }  

  cancionesAlbum: CancionPrincipal[] = [];

  constructor(
    private albumService: AlbumService,
    private cancionService: CancionService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.params;
    let id = parseInt(params["id"]);
    
    this.albumService.obtenerAlbumPorId(id).subscribe(albumResp => {
      this.album = albumResp as Album;            
    });

    this.cancionService.obtenerCancionesAlbum(id).subscribe(albumResp => {
      this.cancionesAlbum = albumResp as CancionPrincipal[];            
    });
  }

}
