import {
  CoreTreeNode,
  CoreTreeNodeAction,
  CoreTreeState,
  NetworkEntity
} from '../core-tree.types';
import { Observable } from 'rxjs';

export abstract class AbstractTreeToken<T> {
  abstract data: T[];
  abstract state: CoreTreeState;
  abstract isExpanded: (item: T, path: any) => boolean;
  abstract expandFn: (item: T, path: any) => void;
  abstract collapseFn: (item: T, path: any) => void;
  abstract stateChange: Observable<CoreTreeState>;
  abstract expand: Observable<CoreTreeNodeAction>;
  abstract collapse: Observable<CoreTreeNodeAction>;
  abstract toggle: Observable<CoreTreeNodeAction>;
  abstract bindKey: string | ((item: T) => any);
  abstract bindChildren:
    | string
    | ((item: T) => T[] | Observable<T[] | NetworkEntity<T[]>>);
  abstract isExpandable: string | ((item: T) => boolean);
}
