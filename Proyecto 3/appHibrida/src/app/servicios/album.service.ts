import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  obtenerAlbumes(){
    return this.http.get('http://localhost:3000/api/albumes');
  }

  obtenerAlbumPorId(id:number){
    return this.http.get('http://localhost:3000/api/albumes/'+id.toString());
  }
}
