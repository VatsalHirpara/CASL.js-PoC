import { get } from 'lodash';

export default (template: string, vars: object) => {
  return JSON.parse(template, (_, rawValue) => {
    if (rawValue[0] !== '$') {
      return rawValue;
    }
    const name = rawValue.slice(2, -1);
    const value = get(vars, name);
    if (typeof value === 'undefined') {
      return rawValue;
      // throw new ReferenceError(`Variable ${name} is not defined`);
    }
    return value;
  });
};