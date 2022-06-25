export class Program {
  public static main() {
    const aClass = new AClass(new Foo());
    aClass.do();
  }
}

// note - AClass is public too
export class AClass {
  public constructor(private readonly foo: IFoo) {}

  public do() {
    this.foo.bar("Hello, World!");
  }
}

interface IFoo {
  bar(message: string): void;
}

class Foo implements IFoo {
  public bar(message: string) {
    console.log(message);
  }
}
