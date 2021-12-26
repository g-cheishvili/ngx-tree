import { TemplateRef } from '@angular/core';

export interface CoreTreeNodeContext<T> extends CoreTreeNode<T> {
  $implicit: CoreTreeNode<T>;
}

export interface CoreTreeContext<T> {
  items: T[];
  level: number;
  parentPath: string;
  parent?: T;
}

export interface CoreTreeNode<T> {
  parent: T;
  item: T;
  expandable: boolean;
  level: number;
  path: string;
  children: T[];
  childrenTemplate: TemplateRef<any>;
  isExpanded: () => boolean;
  expanded: () => boolean; // @deprecated
  expand: () => void;
  collapse: () => void;
  toggle: () => void;
}

export interface CoreTreeNodeAction<T extends any = any> {
  type: 'expand' | 'collapse';
  item: T;
  path: string;
}

export type CoreTreeState = Record<string, boolean>;

export interface CoreTreeItem extends Record<string, any> {
  id: any;
  children: [];
}
