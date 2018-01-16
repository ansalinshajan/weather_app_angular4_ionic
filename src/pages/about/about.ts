import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public myDate: Date;
  constructor(public navCtrl: NavController) {
    this.myDate = new Date();
  }

}
