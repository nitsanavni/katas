import { Observer, Subject } from "rxjs";

export class Program {
  public static configure() {
    const bazChannel = new Subject<string>;
    
    const foo = new Foo();

    const bar = foo.bar.bind(foo);

    // foo starts reacting to bazChannel events
    bazChannel.subscribe(bar)
    
    const aClass = new AClass();
    
    // bazChannel starts receiving baz events from aClass
    aClass.onBaz.subscribe(bazChannel);

    return { aClass, foo, bar, bazChannel };
  }

  public static main() {
    const { aClass } = this.configure();

    aClass.do();
  }
}

export class AClass {
  private readonly baz = new Subject<string>;
  
  public get onBaz() {
    return this.baz.asObservable();
  }

  public do() {
    this.baz.next("Hello, World!");
  }
}

class Foo {

  public bar(message: string) {
    console.log(message);
  }
}
