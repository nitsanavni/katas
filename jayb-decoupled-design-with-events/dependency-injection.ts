import "reflect-metadata";
import { Container, inject, injectable } from "inversify";

export class Program {
  public static main() {
    const aClass = container.get<AClass>("aClass");
    aClass.do();
  }
}

@injectable()
export class AClass {
  @inject("foo")
  private foo!: IFoo;

  public do() {
    this.foo.bar("Hello, World!");
  }
}

export interface IFoo {
  bar(message: string): void;
}

@injectable()
class Foo implements IFoo {
  public bar(message: string) {
    console.log(message);
  }
}

export const container = (() => {
  const container = new Container();

  container.bind<IFoo>("foo").to(Foo);
  container.bind<AClass>("aClass").to(AClass);

  return container;
})();
