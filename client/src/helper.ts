import 'reflect-metadata';

export const Inject = (target: any, key: string) => {
  const getter = () => {
    const t = Reflect.getMetadata('design:type', target, key);
    return new t();
  };
  if (delete this[key]) {
    Object.defineProperty(target, key, {
      get: getter,
    });
  }
};

export const splitArr = <T>(arr: T[], n: number) => {
  const res: Array<T[]> = [];
  for (let i = 1; i <= n + 1; i++) {
    res.push(arr.slice((i - 1) * n, i * n));
  }
  return res;
};
