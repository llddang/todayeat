// Camel -> Snake
export type CamelToSnake<S extends string> = S extends `${infer F}${infer R}`
  ? F extends Uppercase<F>
    ? `_${Lowercase<F>}${CamelToSnake<R>}`
    : `${F}${CamelToSnake<R>}`
  : S;
export type SnakeCaseObject<T> =
  T extends Array<infer U>
    ? Array<SnakeCaseObject<U>>
    : T extends object
      ? { [K in keyof T as CamelToSnake<K & string>]: SnakeCaseObject<T[K]> }
      : T;

// Snake -> Camel
export type SnakeToCamel<S extends string> = S extends `${infer P}_${infer C}${infer R}`
  ? `${Lowercase<P>}${Uppercase<C>}${SnakeToCamel<R>}`
  : Lowercase<S>;
export type CamelCaseObject<T> =
  T extends Array<infer U>
    ? Array<CamelCaseObject<U>>
    : T extends object
      ? { [K in keyof T as SnakeToCamel<K & string>]: CamelCaseObject<T[K]> }
      : T;
