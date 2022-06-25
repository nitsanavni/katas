export class Program {
  public static main() {
    const aClass = new AClass();
    aClass.do();
  }
}

class AClass {
  private readonly foo = new Foo();

  public do() {
    this.foo.bar("Hello, World!");
  }
}

class Foo {
  public bar(message: string) {
    console.log(message);
  }
}
