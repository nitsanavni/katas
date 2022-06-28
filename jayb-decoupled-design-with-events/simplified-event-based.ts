export class Program {
  public static configure() {
    const foo = new Foo();
    const aClass = new AClass();
    const bar = foo.bar.bind(foo);

    aClass.onBaz = bar;

    return { aClass, foo, bar };
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
