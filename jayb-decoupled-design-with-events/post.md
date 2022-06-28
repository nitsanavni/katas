---
layout: post
title: Decoupled Design with Rx
---

Following Jay Bazuzi's post on [Decoupled Design with Events](https://jay.bazuzi.com/Decoupled-Design/), I wanted to show a possible variation using [Rx](https://reactivex.io/).

> not sure about this section:

I got introduced to Rx a few years back while building an Android SDK that was running image processing algorithms in C++ in conjuction with a Java-based UI workflow. [RxJava](https://github.com/ReactiveX/RxJava) made it much easier to manage threading and thus reaching the required performance.

Rx stuck with me since as a nice tool I could use...

In particular for this discussion I like how [`Subject`s](https://reactivex.io/documentation/subject.html) can act as channels (or 'topics') for eventing.

So this 



Full source code can be found [here](https://github.com/nitsanavni/katas/tree/main/jayb-decoupled-design-with-events).