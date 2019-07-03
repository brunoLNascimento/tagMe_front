import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/app/loading/loading.service';
import { ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  res: any;
  return: any;
  searchQuery: any;

  constructor( 
    public loading: LoadingService,
    private http: HttpClient,
    private toastController: ToastController,
    private storage: Storage,
    private nav: NavController,
  ) { }

  ngOnInit() {
    this.loading.present();
    this.http.get("http://localhost:3000/tagMe/menu").subscribe(res =>{
      this.loading.dismiss();
      this.return = res
      this.storage.set('menu', this.return)
    })
  }

  updateList() {
    this.http.get(`http://localhost:3000/tagMe/menu/${this.searchQuery}`)
    .subscribe( async (response: any) => {
  //    this.storage.get('details').then(details  => {
      this.return = response
      //this.return = details
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
