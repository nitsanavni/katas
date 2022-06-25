export class Program {
  public static configure() {
    const foo = new Foo();
    const aClass = new AClass();
    aClass.onBaz.add(foo.bar.bind(foo));

    return { aClass, foo };
  }

  public static main() {
    const { aClass } = this.configure();

    aClass.do();
  }
}

type Action<T> = (t: T) => void;

const event = <T>() => {
  const invocations: Action<T>[] = [];

  const add = (action: Action<T>) => invocations.push(action);
  const getInvocationList = () => invocations;
  const invokeWith = (t: T) => invocations.forEach((i) => i(t));

  return { add, getInvocationList, invokeWith };
};

export class AClass {
  public onBaz = event<string>();

  public do() {
    this.onBaz.invokeWith("Hello, World!");
  }
}

class Foo {
  public bar(message: string) {
    console.log(message);
  }
}
