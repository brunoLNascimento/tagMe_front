import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  details: any;
  
  constructor(
      private storage: Storage,
  ) { }

  async ngOnInit() {
    this.storage.get('details').then(details  => {
      this.details = details
    })

  }

}
