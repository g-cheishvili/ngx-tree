import { catchError, map, of, OperatorFunction, startWith, tap } from 'rxjs';
import { NetworkEntity } from './core-tree.types';
import {
  createFailedNetworkEntity,
  createLoadingNetworkEntity,
  createSuccessNetworkEntity
} from './core-tree.helpers';

export function resolveNetworkEntity<T = any>(): OperatorFunction<
  T,
  NetworkEntity<T>
> {
  return (source) => {
    return source.pipe(
      map((r) => createSuccessNetworkEntity(r)),
      startWith(createLoadingNetworkEntity<T>()),
      catchError((error) => of(createFailedNetworkEntity(error)))
    );
  };
}

export function tapOnSuccess<T = any>(
  action: (networkEntity: NetworkEntity<T>) => void
): OperatorFunction<NetworkEntity<T>, NetworkEntity<T>> {
  return (source) => {
    return source.pipe(
      tap((entity) => {
        if (entity.state === 'Success') {
          action(entity);
        }
      })
    );
  };
}
