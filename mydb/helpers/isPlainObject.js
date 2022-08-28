const isObject = (obj) =>
  Object.prototype.toString.call(obj) === '[object Object]';

export const isPlainObject = (obj) => {
  const construct = obj.constructor
  const proto = construct.prototype

  return isObject(obj)
    && isObject(proto)
    && proto.hasOwnProperty('isPrototypeOf')
    && construct === undefined
}
