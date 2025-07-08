/**
 * @abstract Singleton
 * @description A singleton class that ensures only one instance of a class is created
 * @example
 * class MyService extends Singleton {}
 * const myService = MyService.getInstance(MyService);
 */
abstract class Singleton<T> {
  private static instance: unknown = null;

  /**
   * @brief Protected constructor to prevent direct instantiation.
   */
  public constructor() {
    if (Singleton.instance) {
      throw new Error('Cannot create multiple instances of singleton class');
    }
  }

  /**
   * @brief Get the singleton instance.
   *
   * @returns The singleton instance of type T.
   */
  public static getInstance<T>(this: new () => T): T {
    if (!Singleton.instance) {
      // biome-ignore lint/complexity/noThisInStatic: <explanation>
      Singleton.instance = new this();
    }
    return Singleton.instance as T;
  }
}

export default Singleton;
