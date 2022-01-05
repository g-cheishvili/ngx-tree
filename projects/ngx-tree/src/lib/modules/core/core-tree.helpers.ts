import {
  NetworkEntity,
  PartialData,
  PartialNetworkEntity
} from './core-tree.types';

export function createInitialNetworkEntity<T = any>(
  initialData?: T
): NetworkEntity<T> {
  return {
    data: initialData,
    state: 'Initial'
  };
}

export function createLoadingNetworkEntity<T = any>(
  initialData?: T
): NetworkEntity<T> {
  return {
    data: initialData,
    state: 'Loading'
  };
}

export function createSuccessNetworkEntity<T = any>(
  data?: T
): NetworkEntity<T> {
  return {
    data,
    state: 'Success'
  };
}

export function createFailedNetworkEntity<T = Error>(
  data?: T
): NetworkEntity<T> {
  return {
    data,
    state: 'Failure'
  };
}

export function createInitialPartialNetworkEntity<T = any>(
  initialData?: T[]
): PartialNetworkEntity<T> {
  return createInitialNetworkEntity<PartialData<T>>({
    items: initialData,
    start: 0,
    chunkSize: undefined,
    totalItems: undefined
  });
}

export function createLoadingPartialNetworkEntity<T = any>(
  initialData?: T[]
): PartialNetworkEntity<T> {
  return createLoadingNetworkEntity<PartialData<T>>({
    items: initialData,
    start: 0,
    chunkSize: undefined,
    totalItems: undefined
  });
}

export function createSuccessPartialNetworkEntity<T = any>(
  data?: PartialData<T>
): PartialNetworkEntity<T> {
  return createLoadingNetworkEntity<PartialData<T>>(data);
}
