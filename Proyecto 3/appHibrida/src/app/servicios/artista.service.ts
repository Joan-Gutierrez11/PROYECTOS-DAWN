import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Artista } from '../interfaz/artista';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {
  
  constructor(private http: HttpClient) { }

  obtenerArtistas(){
    return this.http.get('http://localhost:3000/api/artistas');
  }

  obtenerArtistaPorId(id:number){
    return this.http.get('http://localhost:3000/api/artistas/'+id.toString());
  }

}
