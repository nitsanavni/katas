---
layout: post
title: Decoupled Design with Rx
---

Following Jay Bazuzi's post, [Decoupled Design with Events](https://jay.bazuzi.com/Decoupled-Design/), I wanted to show a possible variation using [Rx](https://reactivex.io/) in Typescript.

In particular for this discussion I like how [`Subject`s](https://reactivex.io/documentation/subject.html) can act as channels (or 'topics') for eventing.

Here's a simplified Typescript version of Jay's event-based solution (I tried staying loyal to the OP):

```ts
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
```

And the tests (I'm using [`ava`](https://github.com/avajs/ava) here):

```ts
test("AClass raises event at right time", (t) => {
  const aClass = new AClass();
  const onBaz = sinon.spy();
  aClass.onBaz = onBaz;

  aClass.do();

  t.deepEqual(onBaz.firstCall.firstArg, "Hello, World!");
});

test("configure", (t) => {
  const { aClass, bar } = Program.configure();

  t.is(aClass.onBaz, bar);
});
```

For our Rx example, we'll be replacing `onBaz: Action<string>` with a `rxjs.Subject<string>`.

```ts
class AClass {
  private readonly baz = new Subject<string>();

  public get onBaz() {
    return this.baz.asObservable();
  }

  public do() {
    this.baz.next("Hello, Rx!");
  }
}
```

`AClass` will be emitting events via its `onBaz: Observable`.

This can be tested in isolation by subscribing to `onBaz`:

```ts
const aClass = new AClass();
const bazSpy = sinon.spy();
aClass.onBaz.subscribe(bazSpy);

aClass.do();

t.deepEqual(bazSpy.firstCall.firstArg, "Hello, Rx!");
```

`Program.configure()` will tie things up - connecting the source of the event (`AClass`) the consumer (`Foo`).

```ts
public static configure() {
  // the channel through which the events are flowing can be extracted
  // as a separate entity and later used in tests
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
```

Here I've introduced a second `Subject` to act as a connecting channel between emitter and consumer, this is not necessary but it creates an extra separation which I sometimes like.

There might be a few benefits for doing that, but the one that I care about in our context is - this makes the connecting tissue separate, explicit, testable, with a proper name, and basically makes things clearer.

Here's an example of how we can use this extra entity in our tests - we can intercept `bazChannel` events as they're emitted from the source:

```ts
const { aClass, bazChannel } = Program.configure();
const bazSpy = sinon.spy();
bazChannel.subscribe(bazSpy);

aClass.do();

t.deepEqual(bazSpy.firstCall.firstArg, "Hello, Rx!");
```

Full source code, including all of Jay's examples translated to Typescript can be found [here](https://github.com/nitsanavni/katas/tree/main/jayb-decoupled-design-with-events).
