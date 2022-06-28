---
layout: post
title: Decoupled Design with Rx
---

Following Jay Bazuzi's post on [Decoupled Design with Events](https://jay.bazuzi.com/Decoupled-Design/), I wanted to show a possible variation using [Rx](https://reactivex.io/) in Typescript.

> not sure about this section:

I got introduced to Rx a few years back while building an Android SDK that was running image processing algorithms in C++ in conjuction with a Java-based UI workflow. [RxJava](https://github.com/ReactiveX/RxJava) made it much easier to manage threading and thus reaching the required performance.

Rx stuck with me since as a nice tool I could use...

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

Full source code can be found [here](https://github.com/nitsanavni/katas/tree/main/jayb-decoupled-design-with-events).
