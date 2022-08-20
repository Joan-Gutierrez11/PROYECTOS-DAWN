import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Artista } from '../interfaz/artista';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {
  artista: Artista = {
    id:-1, nombre:'', foto:'', albumesDeArtista:[]
  }

  constructor(private http: HttpClient) { }

  obtenerArtistas(){
    return this.http.get('http://localhost:3000/api/artistas');
  }

  obtenerArtistaPorId(id:number){
    return this.http.get('http://localhost:3000/api/artistas/'+id.toString());
  }

  obtenerAlbumesArtista(id:number){    
  }

}
