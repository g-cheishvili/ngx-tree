import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import { AbstractTreeToken } from '../../../core/tokens/AbstractTreeToken';
import {
  CoreTreeNodeAction,
  CoreTreeState,
  NetworkEntity
} from '../../../core/core-tree.types';
import { resolvePropertyFn } from '../../../core/utils/resolveProperty';
import { isObservable, Observable, of } from 'rxjs';
import {
  resolveNetworkEntity,
  tapOnSuccess
} from '../../../core/core-tree.pipes';
import { TreeToken } from '../../tokens/TreeToken';

@Component({
  selector: 'ngt-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [
    {
      provide: AbstractTreeToken,
      useExisting: forwardRef(() => TreeComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeComponent<T = any> extends TreeToken<T> {
  @Input() data: T[] = [];
  @Input() state: CoreTreeState = {};
  @Input() isExpanded: (item: T, path: any) => boolean;
  @Input() expandFn: (item: T, path: any) => void;
  @Input() collapseFn: (item: T, path: any) => void;
  @Input() selection: 'multiple' | 'single' | 'off' = 'off';
  @Output() stateChange = new EventEmitter<CoreTreeState>();
  @Output() expand = new EventEmitter<CoreTreeNodeAction>();
  @Output() collapse = new EventEmitter<CoreTreeNodeAction>();
  @Output() toggle = new EventEmitter<CoreTreeNodeAction>();

  keyBinder: (item: T) => any = (item: any) => item.id;
  childrenBinder: (item: T) => T[] = (item: any) => {
    if (!this.loadedChildren.has(item)) {
      this.loadedChildren.set(item, this.resolveProperty(item, 'children'));
    }
    return this.loadedChildren.get(item) as T[];
  };
  isExpandableBinder: (item: T) => boolean = (item) =>
    Array.isArray(this.childrenBinder(item));

  private resolveProperty = resolvePropertyFn();

  // @ts-ignore
  loadedChildren = new WeakMap<T, T[]>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  @Input()
  set bindKey(bindKey: string | ((item: T) => any)) {
    if (bindKey) {
      this.keyBinder =
        typeof bindKey === 'function'
          ? bindKey
          : (item) => this.resolveProperty(item, bindKey);
      this.changeDetectorRef.markForCheck();
    }
  }

  @Input()
  set bindChildren(
    bindChildren:
      | string
      | ((item: T) => T[] | Observable<T[] | NetworkEntity<T[]>>)
  ) {
    if (bindChildren) {
      this.childrenBinder =
        typeof bindChildren === 'function'
          ? (item) => {
              if (this.loadedChildren.has(item)) {
                return this.loadedChildren.get(item);
              }
              const children = bindChildren(item);
              if (isObservable(children)) {
                return children.pipe(
                  resolveNetworkEntity(),
                  tapOnSuccess((children) => {
                    this.loadedChildren.set(item, children as any);
                  })
                );
              }
              this.loadedChildren.set(item, children);
              return of(children);
            }
          : (item) => this.resolveProperty(item, bindChildren);
      this.changeDetectorRef.markForCheck();
    }
  }

  @Input()
  set isExpandable(isExpandable: string | ((item: T) => boolean)) {
    if (isExpandable) {
      this.isExpandableBinder =
        typeof isExpandable === 'function'
          ? isExpandable
          : (item) => !!this.resolveProperty(item, isExpandable);
      this.changeDetectorRef.markForCheck();
    }
  }
}
