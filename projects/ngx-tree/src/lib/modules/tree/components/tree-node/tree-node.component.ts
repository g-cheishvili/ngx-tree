import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { CoreTreeNode } from '../../../core/core-tree.types';
import { AbstractTreeToken } from '../../../core/tokens/AbstractTreeToken';
import { TreeToken } from '../../tokens/TreeToken';

@Component({
  selector: 'ngt-tree-node, [ngtTreeNode]',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'ngt-node'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeNodeComponent<T = any> {
  @Input('ngtTreeNode') item: CoreTreeNode<T>;

  constructor(@Inject(AbstractTreeToken) private parent: TreeToken<T>) {}

  get hasSelect() {
    return (
      this.parent &&
      (this.parent.selection === 'multiple' ||
        this.parent.selection === 'single')
    );
  }

  resolveLabel() {
    return (this.item.item as any).name;
  }
}
