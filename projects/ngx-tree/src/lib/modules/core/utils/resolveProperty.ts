function _resolveProperty(
  object: Record<string, any>,
  propertyPath: string
): any {
  const fullPath = propertyPath.split('.');
  let value;
  let obj = object;
  for (const path of fullPath) {
    if (typeof obj === 'object' && obj !== null && obj.hasOwnProperty(path)) {
      value = obj[path];
      obj = obj[path];
    } else {
      return undefined;
    }
  }
  return value;
}

export function resolvePropertyFn(): (
  object: Record<string, any>,
  propertyPath: string
) => any {
  const cache = new WeakMap();
  return (object: Object, propertyPath: string) => {
    if (!cache.has(object)) {
      cache.set(object, new Map<string, any>());
    }
    const objCache = cache.get(object);
    if (objCache.has(propertyPath)) {
      return objCache.get(propertyPath);
    }
    const property = _resolveProperty(object, propertyPath);
    objCache.set(propertyPath, property);
    return property;
  };
}
