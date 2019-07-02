import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  details: any;
  test: any;
  test1: any;
  ingredientes: any;
  menu: any;
  iniciar: boolean;
  message: any;
  minutos: any;
  segundos: any;
  fim: any;


  constructor(
      private storage: Storage,
      public alertController: AlertController
  ) {
    this.iniciar = false
   }

  async ngOnInit() {
      this.storage.get('details').then(details  => {
      this.details = details
      this.test = details.ingredientes
      this.test1 = details.modoPreparo
    })
  }

  checkIngredientes(dish){
    if(!this.ingredientes){
      this.ingredientes = 0
    }
    if(dish.checked == false){
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
    
    }else{
      modo.checked = false
      this.menu = this.menu - 1
    }

  }
  
  start(){
    if(this.ingredientes == this.test.length){
      this.iniciar = true
      var minutos = new Date().getMinutes()
      var segundos = new Date().getSeconds()
      var inicio = { minutos, segundos }
      this.storage.set("inicio", inicio)  
    }else{
      this.message = "Para iniciar a preparação, certifique-se de que você tem todos os ingredientes selecionados!"
      this.presentAlert(this.message);
    }
  }
  
  finish(){
    if(this.menu == this.test1.length){
      this.storage.get('inicio').then(inicio  => {
      
      this.fim = new Date()
      var fimMinutos = this.fim.getMinutes()
      var fimSegundos = this.fim.getSeconds()
      this.minutos =  inicio.minutos - fimMinutos
      this.segundos = inicio.segundos - fimSegundos
      
      this.message = "Prato finalizado com sucesso em " +this.minutos+ " minutos e " +this.segundos+ " segundos!"
      this.presentAlert(this.message); 
      })
    }else{
      this.message = "Ainda falta passo(s) para finalizar a receita"
      this.presentAlert(this.message);
    }
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['Entendi']
    });

    await alert.present();
  }

}
