import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public weather:any;
  location: {
    city: string,
    state:string
  }
  constructor(
    public navCtrl:NavController, 
    private weatherProvider:WeatherProvider,
    private storage:Storage,
    public alertCtrl:AlertController) {
  }

  ionViewWillEnter() {
    this.storage.get('location').then((val) => {
      if(val != null) {
        this.location = JSON.parse(val);
      } else {
        this.location = {
          city: 'Miami',
          state: 'FL'
        }
      }
      this.weatherProvider.getWeather(this.location.city, this.location.state)
        .subscribe(weather => {
          if(JSON.stringify(weather['response'].error)) {
            let alert = this.alertCtrl.create({
              title: 'Opps error occured',
              subTitle: JSON.stringify(weather['response'].error.description),
              buttons: ['OK']
            })
            alert.present();
            this.navCtrl.push(SettingsPage);
          } else {
            this.weather = weather;
          }
        }
      );
    })
  }
}
