import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface CoreTreeNodeContext<T> extends CoreTreeNode<T> {
  $implicit: CoreTreeNode<T>;
}

export interface CoreTreeContext<T> {
  items: T[] | NetworkEntity<T[]>;
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
  children?: T[] | Observable<T[]> | Observable<NetworkEntity<T[]>>;
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

export type CoreTreeState =
  | Record<string, boolean>
  | WeakMap<any, boolean>
  | WeakSet<any>;

export type NetworkEntityState = 'Initial' | 'Loading' | 'Success' | 'Failure';

export interface NetworkEntity<T = any> {
  data?: T | Error;
  state: NetworkEntityState;
}

export interface PartialData<T = any> {
  items?: T[];
  start?: number;
  chunkSize?: number;
  totalItems?: number;
}

export type PartialNetworkEntity<T = any> = NetworkEntity<PartialData<T>>;

export function isNetworkEntity(data: any): data is NetworkEntity {
  return (
    data &&
    data.hasOwnProperty &&
    data.hasOwnProperty('items') &&
    data.hasOwnProperty('state')
  );
}

export function isPartialData(data: any): data is PartialData {
  return (
    data &&
    data.hasOwnProperty &&
    data.hasOwnProperty('items') &&
    data.hasOwnProperty('start') &&
    data.hasOwnProperty('chunkSize') &&
    data.hasOwnProperty('totalItems') &&
    Array.isArray(data.items) &&
    typeof data.start === 'number' &&
    typeof data.chunkSize === 'number' &&
    typeof data.totalItems === 'number'
  );
}

export function isPartialNetworkEntity(
  data: any
): data is PartialNetworkEntity {
  return isNetworkEntity(data) && isPartialData(data.data);
}
