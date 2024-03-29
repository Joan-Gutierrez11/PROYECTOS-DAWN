import { Component, OnInit } from '@angular/core';
import { Cancion } from '../interfaz/cancion';
import { CancionPrincipal } from '../interfaz/cancion-principal';
import { CancionService } from '../servicios/cancion.service';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  terminoBuscar:string = '';
  canciones: CancionPrincipal[] = [];
  cancionesFiltro: CancionPrincipal[] = [];

  constructor(
    private cancionService: CancionService,
  ) { }

  ngOnInit(): void {
    this.cancionService.obtenerNumCanciones(100).subscribe(resp =>{
      this.canciones = resp as CancionPrincipal[];
    });
  }

  filtrarCanciones(valor:string){
    this.cancionesFiltro = this.canciones.filter((val) => val.nombreCancion.toLowerCase().includes(valor));
  }

  milisegundosAMinutosYSegundos = (milisegundos:number) => {
    let minutes = Math.floor(milisegundos / 60000);
    let seconds = ((milisegundos % 60000) / 1000).toFixed(0);
    return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
  };

  mostrarTituloMinimizado(titulo: string){
    return titulo.length > 15 ? titulo.slice(0, 15) + '...' : titulo;
  }

}
