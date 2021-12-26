import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';
import { NodeDirective } from '../../directives/node.directive';
import {
  CoreTreeContext,
  CoreTreeNode,
  CoreTreeNodeAction,
  CoreTreeNodeContext,
  CoreTreeState
} from '../../core-tree.types';
import { resolvePropertyFn } from '../../utils/resolveProperty';

@Component({
  selector: 'ngt-tree-core, [ngtTreeCore]',
  templateUrl: './tree-core.component.html',
  styleUrls: ['./tree-core.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeCoreComponent<T = any> {
  @Input() data: T[] = [];
  @Input() state: CoreTreeState = {};
  @Input() isExpanded: (item: T, path: any) => boolean;
  @Input() expandFn: (item: T, path: any) => void;
  @Input() collapseFn: (item: T, path: any) => void;
  @Output() stateChange = new EventEmitter<CoreTreeState>();
  @Output() expand = new EventEmitter<CoreTreeNodeAction>();
  @Output() collapse = new EventEmitter<CoreTreeNodeAction>();
  @Output() toggle = new EventEmitter<CoreTreeNodeAction>();
  @ContentChild(NodeDirective, { static: false }) node: NodeDirective;

  keyBinder: (item: T) => any = (item: any) => item.id;
  childrenBinder: (item: T) => T[] = (item: any) => item.children;
  isExpandableBinder: (item: T) => boolean = (item) =>
    Array.isArray(this.childrenBinder(item));

  private resolveProperty = resolvePropertyFn();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.trackByKey = this.trackByKey.bind(this);
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
  set bindChildren(bindChildren: string | ((item: T) => T[])) {
    if (bindChildren) {
      this.childrenBinder =
        typeof bindChildren === 'function'
          ? bindChildren
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

  createNodeContext(
    item: T,
    parentPath: string,
    offset: number,
    parent: T,
    childrenTemplate: TemplateRef<void>
  ): CoreTreeNodeContext<T> {
    const path = this.generatePath(parentPath, offset);
    const expand =
      typeof this.expandFn === 'function'
        ? () => this.expandFn(item, path)
        : () => this.triggerExpand(item, path);
    const collapse =
      typeof this.collapseFn === 'function'
        ? () => this.collapseFn(item, path)
        : () => this.triggerCollapse(item, path);
    const isExpanded =
      typeof this.isExpanded === 'function'
        ? () => this.isExpanded(item, path)
        : () => this.state[path];
    const toggle = () => (isExpanded() ? collapse() : expand());
    const node: CoreTreeNode<T> = {
      item,
      expandable: this.isExpandableBinder(item),
      level: parentPath.length + 1,
      path,
      parent,
      children: this.childrenBinder(item),
      childrenTemplate,
      isExpanded,
      expanded: isExpanded, // @deprecated
      expand,
      collapse,
      toggle
    };

    return {
      ...node,
      $implicit: node
    };
  }

  triggerExpand(item: any, path: string) {
    const action: CoreTreeNodeAction = {
      type: 'expand',
      item,
      path
    };
    this.state = {
      ...this.state,
      [path]: true
    };
    this.stateChange.next(this.state);
    this.expand.next(action);
    this.toggle.next(action);
    this.changeDetectorRef.markForCheck();
  }

  triggerCollapse(item: any, path: string) {
    const action: CoreTreeNodeAction = {
      type: 'collapse',
      item,
      path
    };

    this.state = {
      ...this.state,
      [path]: false
    };
    this.stateChange.next(this.state);
    this.collapse.next(action);
    this.toggle.next(action);
    this.changeDetectorRef.markForCheck();
  }

  generatePath(parentPath: string, offset: number): string {
    return parentPath + '/' + offset;
  }

  trackByKey(index: number, item: T): any {
    return this.keyBinder(item);
  }

  createTreeContext(
    items: T[],
    level: number,
    parentPath: string,
    offset?: number,
    parent?: T
  ): CoreTreeContext<T> {
    return {
      items,
      level: level + 1,
      parentPath:
        typeof offset === 'number' ? this.generatePath(parentPath, offset) : '',
      parent
    };
  }
}
