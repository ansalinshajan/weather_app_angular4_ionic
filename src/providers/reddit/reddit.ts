import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class RedditProvider {
  baseUrl: String;

  constructor(public http: HttpClient) {
    this.http = http;
    this.baseUrl = 'https://www.reddit.com/r';
  }
  getPosts(category, limit) {
    return this.http.get(this.baseUrl+'/'+category+'/top.json?limit='+limit);
  }

}
