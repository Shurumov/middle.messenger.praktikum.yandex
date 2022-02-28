const objectProto = Object.prototype;

export function isPrototype(value: Function | FunctionConstructor | Object) {
  const ctor = value && value.constructor;
  const proto = (typeof ctor === 'function' && ctor.prototype) || objectProto;

  return value === proto;
}
