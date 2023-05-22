# TDD with Orange, Green, Refactor

Let's discuss preparatory refactorings and how they relate to TDD.

## I was fizzbuzzing along

I was working on the [fizzbuzz](https://github.com/nitsanavni/katas/tree/main/fizzbuzz-with-idiff) kata today using the jq language. Katas are repeated exercises, that help focus on many aspects and skills related to the craft of software development. [Fizzbuzz](https://sammancoaching.org/kata_descriptions/fizzbuzz.html) is one such kata that I like in particular, and it's great for practicing TDD. Jq is a programming language for processing JSON documents in the cli and in scripts, but it's expressive enough to solve these kinds of exercises.

At some point during the implementation I wanted to ["make the change easy"](https://twitter.com/KentBeck/status/250733358307500032?s=20).

Here's how I got there.

The way I've built up the functionality was by extending the range of inputs I was approval-testing - with each TDD iteration the range increases by 1. Meaning - the first testing iteration was for `fizzbuzz(1)`, the next added the `2` - `fizzbuzz(1, 2)` (pseudo speaking), etc.

Now I had gone up to `5`, and the code looked something like this:

```jq
def fizz: { d: 3, c: "Fizz" };
def buzz: { d: 5, c: "Buzz" };

def fizzbuzz:
  if . == fizz.d then fizz.c
  elif . == buzz.d then buzz.c
  else .
  end;
```

It was time for **Red** again, so I've extended the test to include `6`:

```diff
- range(5) + 1 | fizzbuzz
+ range(6) + 1 | fizzbuzz
```

I now have a failing test, and the approval testing framework shows me this diff to be approved:

```diff
@@ -3,3 +3,4 @@
 Fizz
 4
 Buzz
+6
```

Seeing this new `6` makes me think:

> This `6` should actually be a `Fizz`, and...
> I know how to achieve that!

```diff
@@ -2,7 +2,7 @@ def fizz: {d:3,c:"Fizz"};
 def buzz: {d:5,c:"Buzz"};

 def fizzbuzz:
-  if . == fizz.d then fizz.c
+  if . % fizz.d == 0 then fizz.c
   elif . == buzz.d then buzz.c
   else .
   end;
```

And as I started typing, I thought:

> Wait! Can I make this change easy?  
> ... _How_ can I make this change easy?

## Making Changes Easy

Making a change easy means refactoring the code to a design that will lend itself better to the specific anticipated change.

I use the word "refactoring" for - modifying the code's structure while preserving its behavior exactly.

Refactorings traditionally should only be done while all test are passing.

## But... I shouldn't refactor while in Red

I am now in Red, so traditionally I should now write the simplest code to make the test pass. Then I'll get to refactor.

So I was in conflict. Because I like how the impetus for changing the code's behavior comes from a failing test.

I want to both:

1. Keep my failing test
2. Be able to refactor safely towards the better design, where the change would be "easy"

## What does "Easy" even Mean?

I was imagining having an obvious and natural place to host and isolate the change - e.g. a new function\* like:

```jq
def condition(d): . == d;
```

It would later become:

```diff
- def condition(d): . == d;
+ def condition(d): . % d == 0;
```

In some sense, it's an "easier" change than my original trivial change (directly changing the code in the `fizzbuzz` function), because it's obvious where the change should be done.

\* jq doesn't really have "functions" per se, but it does have "filters" which for the purposes of this discussion serve the same function (he he).

## What are my options?

I could refactor in Red.

I could disable the failing test, and refactor in Green.

I could make the failing test pass with the minimal simplest change, and then refactor.

None of these options is what I want in the context of "making the change easy".

## Preparatory Refactorings

Consider the following Refactoring Categories:

1. **General:** General betterment of the code for prosperity (e.g. readability), preparing for change _in general_
2. **Preparatory:** Preparing for a _specific_ change - the next requirement

The first should be done in Green, meaning _all_ tests passing.  
The second, I propose, should be done in _Orange_.

## Orange, not Red

'Orange' is a state where:

> 1. All previous tests are passing
> 2. One new test is failing expectedly

As opposed to 'Red' being:

> -   Some tests fail

## Testing Frameworks

Some testing frameworks have the notion of [failing tests](https://github.com/avajs/ava/blob/main/docs/01-writing-tests.md#failing-tests) - they are expected to fail, and even cause an error if they pass.

With approval tests there's a pattern I like where an incorrect result is intentionally, temporarily approved so that when the behavior is implemented the change is highlighted by the diff tool.

Here's how it looks like for our failing test for `fizzbuzz(6)`.

First we temporarily approve the incorrect result of `6` (should be `Fizz`):

```diff
@@ -3,3 +3,4 @@
 Fizz
 4
 Buzz
+6
```

We're now in _Orange_.  
Admittedly this is not fully supported by the framework. I would have liked it to be an explicit state. It is only a mental state as of now.

Now we supposedly make the change easy, with a **preparatory refactoring**.

Introduce a function `condition`:

```diff
@@ -1,6 +1,8 @@
 def fizz: { d: 3, c: "Fizz" };
 def buzz: { d: 5, c: "Buzz" };

+def condition(d): . == d;
+
 def fizzbuzz:
   if . == fizz.d then fizz.c
   elif . == buzz.d then buzz.c
```

Use it:

```diff
@@ -4,5 +6,5 @@
 def fizzbuzz:
-  if . == fizz.d then fizz.c
+  if condition(fizz.d) then fizz.c
   elif . == buzz.d then buzz.c
   else .
   end;
```

Now, make the easy change:

```diff
@@ -1,7 +1,7 @@
 def fizz: { d: 3, c: "Fizz" };
 def buzz: { d: 5, c: "Buzz" };

-def condition(d): . == d;
+def condition(d): . % d == 0;

 def fizzbuzz:
   if condition(fizz.d) then fizz.c
```

Our approval test fails and highlights a good diff:

```diff
@@ -3,4 +3,4 @@
 Fizz
 4
 Buzz
-6
+Fizz
```

We approve this, and we're back to _Green_.

And now we can **refactor generally**, for example extract another method `isMultiple`:

```diff
@@ -1,7 +1,8 @@
 def fizz: { d: 3, c: "Fizz" };
 def buzz: { d: 5, c: "Buzz" };

-def condition(d): . % d == 0;
+def isMultiple(d): . % d == 0;
+def condition(d): isMultiple(d);

 def fizzbuzz:
   if condition(fizz.d) then fizz.c
```

## r, r, r, F

You might have noticed that the code changes above adhere to a specific style of Preparatory Refactoring. Making a sequence of small refactorings (r) followed by a single small behavior change (F):

```
r, r, r, F
```

I think I've learned this from [Arlo Belshee](https://jay.bazuzi.com/why-acn/).

Here's our history. I've added an indication of the tests status (Green / Orange):

```
G r extract function `isMultiple`
G F condition: check if d is multiple of n
O r use new function `condition`
O r introduce function `condition`
O t test(fizzbuzz(6))
G r ...
```

Legend: **G**reen, **O**range, **r**efactoring, **t**est, **F**eature

Notice:

-   `G r` - these are General Refactorings
-   `O r` - these are Preparatory Refactorings
-   Getting from Green to Orange is done via a new failing test (`O t`)
-   Getting back to Green is done using the "easy change" (`G F`)

## Conclusion

Sometimes one might want to **refactor** in preparation to a specific change, driven by an intentionally failing test.  
That's the **Orange** state of TDD.

## Resources

[TDD](https://www.google.com/search?q=tdd)  
[The Three Rule Of TDD](http://www.butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd)  
[Preparatory Refactoring Example](https://martinfowler.com/articles/preparatory-refactoring-example.html)  
[Approvals Tests](https://approvaltests.com/)  
[Arlo's Commit Notation](https://github.com/RefactoringCombos/ArlosCommitNotation)  
[The FizzBuzz kata](https://sammancoaching.org/kata_descriptions/fizzbuzz.html) - great for practicing TDD  
[jq](https://stedolan.github.io/jq) - a programming language for processing JSON docs  
[jaq](https://github.com/01mf02/jaq) - an implementation of jq I like using

## Acknowledgements

Thanks Johan Lodin for a super discussion about the Orange state!
