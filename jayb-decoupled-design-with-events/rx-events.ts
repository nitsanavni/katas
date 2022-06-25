import { Subject } from "rxjs";

export class Program {
  public static configure() {
    // the channel through which the events are flowing can be extracted as a separate entity
    // and later used in tests
    const bazChannel = new Subject<string>;
    
    const foo = new Foo();

    const bar = foo.bar.bind(foo);

    // foo starts reacting to bazChannel events
    const sub = bazChannel.subscribe(bar)
    
    const aClass = new AClass();
    
    // bazChannel starts receiving baz events from aClass
    aClass.onBaz.subscribe(bazChannel);

    return { aClass, foo, bar, bazChannel, sub };
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
    this.baz.next("Hello, Rx!");
  }
}

class Foo {
  public bar(message: string) {
    console.log(message);
  }
}
