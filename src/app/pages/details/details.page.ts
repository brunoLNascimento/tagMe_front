import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';
import { AlertController, NavController } from '@ionic/angular';
import * as moment from 'moment'


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  details: any;
  modoPreparo: any;
  receips: any;
  menu: any;
  iniciar: boolean;
  message: any;
  minutos: any;
  segundos: any;
  fim: any;
  hora: any;
  inicio: any;
  header: any;
  finalizar: any;
  ingredientes: any;
  progress: any;

  constructor(
      private storage: Storage,
      public alertController: AlertController,
      private nav: NavController
  ) {
    this.iniciar = false
    this.finalizar = false
   }

  async ngOnInit() {
      this.storage.get('details').then(details  => {
      this.details = details
      this.receips = details.ingredientes
      this.modoPreparo = details.modoPreparo
    })
  }

  checkIngredientes(dish){
    if(!this.ingredientes){
      this.ingredientes = 0
    }

    if(!dish.checked){
      dish.checked = true
      this.ingredientes = this.ingredientes + 1
    }else{
      dish.checked = false
      this.ingredientes = this.ingredientes - 1
    }
  }

  checkPassos(modo){
    if(!this.menu){
      this.menu = 0
    }

    if(!modo.checked){
      modo.checked = true
      this.menu = this.menu + 1
      this.progress = this.menu
    }else{
      modo.checked = false
      this.menu = this.menu - 1
      this.progress = this.menu
    }
  }
  
  start(){
    if(this.ingredientes == this.receips.length){
      this.iniciar = true
      this.inicio = new Date()
      this.storage.set("inicio", this.inicio)  
    }else{
      this.header = "Atenção!"
      this.message = "Para iniciar a preparação, certifique-se de que você tem todos os ingredientes selecionados!"
      this.presentAlert(this.message, this.header);
    }
  }
  
  finish(){
    if(this.menu == this.modoPreparo.length){
      this.storage.get('inicio').then(inicio  => {
        this.header = "OBRIGADO"
        this.fim = new Date()
        var seg = this.fim - inicio
        this.hora = Math.floor(seg / 3600000) % 24
        this.minutos = Math.floor(seg / 60000) % 60
        this.segundos = Math.floor(seg / 1000) % 60
      
        if(this.hora > 0){
          this.message = "Prato finalizado com sucesso em " +this.hora+ " hora(s) " +this.minutos+ " minutos e " +this.segundos+ " segundos!"
        }else{
          this.message = "Prato finalizado com sucesso em " +this.minutos+ " minutos e " +this.segundos+ " segundos!"
        }
        this.finalizar = true
        this.presentAlert(this.message, this.header); 
      })
    }else{
      this.header = "Atenção!"
      this.message = "Ainda falta passo(s) para finalizar a receita"
      this.presentAlert(this.message, this.header);
    }
  }

  home(){
    this.nav.navigateForward(['dashboard'])
    this.storage.set("details", "")  
  }

  backDashboard(){
    this.nav.navigateForward(['dashboard'])
  }

  async presentAlert(message, header) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Entendi']
    });
    await alert.present();
  }

}
