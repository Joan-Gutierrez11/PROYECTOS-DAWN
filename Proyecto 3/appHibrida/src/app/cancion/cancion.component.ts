import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CancionService } from "../servicios/cancion.service";
import { Cancion } from "../interfaz/cancion";


@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.component.html',
  styleUrls: ['./cancion.component.css']
})
export class CancionComponent implements OnInit {
  cancion: Cancion = {    
    nombreCancion:'',
    album_id:-1,
    nombreAlbum:'',
    duracion:-1,
    imagen:'',
    url_cancion:'',    
    letra:''
  }  

  constructor(
    private cancionService: CancionService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.params;
    let id = parseInt(params["id"]);          
    this.cancionService.obtenerCancionPorId(id).subscribe(resp =>{
      this.cancion = resp as Cancion;
    });
  }

}
