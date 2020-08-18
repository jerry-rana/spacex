import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SpaceX - Programs';

  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'keywords', content: 'SpaceX, programs, satellite'},
      {name: 'description', content: 'SpaceX programs listing from 2006 to 2020'}
    ]);
  }
  
}
