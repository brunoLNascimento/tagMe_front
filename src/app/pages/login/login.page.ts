import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: any;
  senha: any;
  usuarioLogin: any;
  senhaLogin: any;
  loginTrue: any;

  constructor(
    private storage: Storage,
    private toastController: ToastController,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.usuario = {
      "nome": "usuarioTeste",
      "senha": "senhaUsuario"
    }
    this.storage.set("usuario", this.usuario) 
  }

  login(){
    this.storage.get("usuario").then(usuario => {
      this.usuario = usuario.nome
      this.senha = usuario.senha

      if(!this.usuarioLogin){
        this.toast("Campo usuário é obrigatório!", 'danger');
      }else if(!this.senhaLogin){
        this.toast("Campo senha é obrigatório!", 'danger');
      }else if(this.usuario != this.usuarioLogin || this.senha != this.senhaLogin){
        this.toast("Usuário ou senha inválidas!", 'danger');
      }else{
        this.nav.navigateForward(['dashboard'])
        this.loginTrue = true
        this.storage.set("usuario" , usuario.loginTrue)
      }
    })
  }

  async toast(msg, color) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: color
    });
    toast.present();
  }
  
}
