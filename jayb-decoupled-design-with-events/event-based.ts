export class Program {
  public static configure() {
    const foo = new Foo();
    const aClass = new AClass();
    aClass.onBaz = foo.bar.bind(foo);

    return { aClass, foo };
  }

  public static main() {
    const { aClass } = this.configure();

    aClass.do();
  }
}

type Action<T> = (t: T) => void;

export class AClass {
  public onBaz!: Action<string>;

  public do() {
    this.onBaz?.("Hello, World!");
  }
}

class Foo {
  public bar(message: string) {
    console.log(message);
  }
}
