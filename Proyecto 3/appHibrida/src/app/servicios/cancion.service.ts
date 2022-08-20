import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Cancion } from '../interfaz/cancion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CancionService {
  cancionesArtista: Cancion[] = [];

  constructor(private http: HttpClient) { }

  obtenerCancionPorId(id:number): Observable<any>{
    return this.http.get(`http://localhost:3000/api/cancion/${id}`);
  }

  obtenerNumCanciones(num:number) {
    return this.http.get(`http://localhost:3000/api/canciones/max=${num}`);
  }

  obtenerCancionesAlbum(idAlbum:number){
    return this.http.get(`http://localhost:3000/api/canciones/album/${idAlbum}`);
  }

  obtenerCancionesArtista(idArtista:number){
    return this.http.get(`http://localhost:3000/api/canciones/${idArtista}`);
  }

}
