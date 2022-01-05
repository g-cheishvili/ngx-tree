import { Component, NgZone } from '@angular/core';
import { map, Observable, of, timer } from 'rxjs';
import { resolveNetworkEntity } from '../../../ngx-tree/src/lib/modules/core/core-tree.pipes';

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
  bindChildren = (item: ItemInterface): Observable<ItemInterface[]> => {
    return timer(3000).pipe(
      map(() => {
        return new Array(10).fill(undefined).map((i, rootIndex) => {
          return {
            id: `${rootIndex}`,
            name: `Tree child item ${rootIndex}`
          } as ItemInterface;
        });
      })
    );
  };
  isExpandable = () => true;

  constructor(private ngZone: NgZone) {
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
