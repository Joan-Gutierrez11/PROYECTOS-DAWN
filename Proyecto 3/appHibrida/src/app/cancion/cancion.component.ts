import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CancionService } from "../servicios/cancion.service";
import { Cancion } from "../interfaz/cancion";
import { Observable } from 'rxjs';

import { Howl } from 'howler';
import { MatSlider } from '@angular/material/slider';

@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.component.html',
  styleUrls: ['./cancion.component.css']
})
export class CancionComponent implements OnInit, OnDestroy {

  @ViewChild('musicSlider', {static: false}) slider: MatSlider | undefined;
  
  cancionObs: Observable<Cancion> | undefined;

  cancion:Cancion = { nombreCancion:'', nombreAlbum:'', album_id:-1, duracion:0, imagen:'', letra:'', url_cancion:'' };

  reproductor: Howl | undefined;

  reproduciendo = false;
  progresoCancion = 0;

  constructor( private cancionService: CancionService, private activatedRoute: ActivatedRoute ) {}

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.params;
    let id = parseInt(params["id"]);          
    this.cancionObs = this.cancionService.obtenerCancionPorId(id);
    this.cancionObs.subscribe(resp =>{ this.cancion = resp as Cancion;});    
  }

  ngOnDestroy(): void {
    this.reproductor?.stop();
  }

  async play(){
    this.cancionObs?.subscribe((resp: Cancion) => {
      if(!this.reproduciendo){
        this.reproductor = new Howl({ 
          src:[resp.url_cancion], 
          html5: true, 
          volume: 1 ,
          onplay: () => {
            this.actualizarProgreso();
          },
          onend: () => {
            this.reproduciendo = false;
          }
        });
        this.reproductor?.play();
        this.reproduciendo = true;
      }
    });
  }

  async stop() {
    if(this.reproduciendo){
      this.reproductor?.stop();
      this.reproductor = undefined;
      this.reproduciendo = false;
    }
  }

  async visualizar() {
    let valor = this.slider?.value;
    let duracion = this.reproductor?.duration();

    if(valor && duracion){
      this.reproductor?.seek(duracion * (valor/100));
    }
  }

  private actualizarProgreso() {
    let valorMomento = this.reproductor?.seek();
    if(valorMomento && this.reproductor?.duration()){
      this.progresoCancion = (valorMomento / this.reproductor?.duration())*100 || 0;
    }

    setTimeout(() => this.actualizarProgreso(), 200);
  }
}
