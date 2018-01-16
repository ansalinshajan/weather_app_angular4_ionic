import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RedditProvider } from '../../providers/reddit/reddit';
import { DetailsPage } from '../details/details';


@IonicPage()
@Component({
  selector: 'page-reddit',
  templateUrl: 'reddit.html',
})
export class RedditPage {
  items: any;
  category: any;
  limit: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private redditProvider: RedditProvider) {
      this.getDefaults();
  }

  ngOnInit() {
    this.getPosts(this.category, this.limit);
  }
  
  getDefaults() {
    if(localStorage.getItem('category') != null) {
      this.category = localStorage.getItem('category');
    } else {
      this.category = 'sports';
    }
    if(localStorage.getItem('limit') != null) {
      this.limit = localStorage.getItem('limit');
    } else {
      this.limit = 10;
    }
  }
  getPosts(category, limit) {
    //console.log('requesting api');
    this.redditProvider.getPosts(category, limit).subscribe(res => {
      this.items = res['data'].children;
    })
  }
  viewItem(item) {
    this.navCtrl.push(DetailsPage, {
      item:item
    });
  }
  changeCategory() {
    this.getPosts(this.category, this.limit);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RedditPage');
  }

}
