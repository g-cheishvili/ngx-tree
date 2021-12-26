import { Component } from '@angular/core';

interface ItemInterface {
  id: string;
  name: string;
  children: ItemInterface[];
}

@Component({
  selector: 'ngt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';
  items: ItemInterface[];

  constructor() {
    this.items = new Array(10).fill(undefined).map((i, rootIndex) => {
      return {
        id: `${rootIndex}`,
        name: `Tree item ${rootIndex}`,
        children: new Array(10).fill(undefined).map((_, childIndex) => {
          return {
            id: `${rootIndex}-${childIndex}`,
            name: `Tree item ${rootIndex}-${childIndex}`,
            children: []
          };
        })
      };
    });
  }
}
