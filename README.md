# AngularJS in Typescript with working httpBackend-mocked E2E tests

## Why AngularJS?

Because it's superheroic. That aside, the angular guys did a great job on
a number of fronts. The documentation is fairly decent, the feature set is
close to complete, the division between controllers, directives, and services
enforces a nice structure on your project. You can get rather deep without ever
having to crack open the source code.

Most importantly, angular folks made it a priority to make the framework compatible
with simple vanilla JavaScript. You write functions, and are not forced to extend
some heavily constraining class hierarchy. This makes it easy to integrate Angular
with TypeScript.

## Why TypeScript?

Have you ever gotten an error "TypeError: Object #<Object> has no method 'blah'" on
the console in a browser? You should have never gotten that error.

JS is dynamically typed and interpreted, which makes you as a developer vulnerable
to runtime errors that would have been caught at compile time had you been using a
statically typed compiled language. This becomes a huge pain when developing large
applications.

TypeScript is JavaScript with type annotations and some other sugary features. It's
compiled to readable JavaScript, and the compiler performs type checking for you,
meaning you catch many errors before you spend time debugging them in the browser.
You get benefits similar to those of a solid unit test suite, but at a tiny fraction
of the cost. And your code gets more readable because you can easily tell what expected
values for a given variable are.

## What's with the E2E part?

Angular comes with an e2e test runner, and provides you a way to mock a fake http
backend for your e2e tests. Sadly there are no official examples of how to get this
stuff working in the context of a real application. The yeoman angular generator, while
awesome, is also lacking in this department (at least last time I checked).

So I want to put out a working example of e2e tests with a mocked backend.



