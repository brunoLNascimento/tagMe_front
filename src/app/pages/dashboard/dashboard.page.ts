import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/app/loading/loading.service';
import { ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from '../../environment/environment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  res: any;
  return: any;
  searchQuery: any;
  usuario: any;

  constructor( 
    public loading: LoadingService,
    private http: HttpClient,
    private toastController: ToastController,
    private storage: Storage,
    private nav: NavController,
  ) { }

  ngOnInit() {
    this.loading.present();
    this.http.get(environment.API_URL + "/tagMe/menu").subscribe(res =>{
      this.loading.dismiss();
      this.return = res
      this.storage.set('menu', this.return)
    })
  }

  updateList() {
    this.http.get(environment.API_URL + `/tagMe/menu/${this.searchQuery}`)
    .subscribe( async (response: any) => {
      this.return = response
    },(error: any) => {
      this.toast(error.error.message, 'danger');
    });
  }

  details(dish){
    this.storage.set('details', dish)
   this.nav.navigateForward(['details'])
  }

  logout(){
    this.storage.clear()
    this.usuario = {
      "nome": "usuarioTeste",
      "senha": "senhaUsuario"
    }
    this.storage.set("usuario", this.usuario) 
    this.nav.navigateForward(['login'])
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
