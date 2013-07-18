# AngularJS in TypeScript with working httpBackend-mocked E2E tests

## Towards TypeScript in generator-angular

I've started working on getting TypeScript, along with some of the other nice tidbits from this project,
into yeoman's generator-angular. You can see the ongoing work here: https://github.com/anchann/generator-angular

## What this project is

* A sample of how one can structure a real-world large app written in AngularJS
using TypeScript as the main language. I aim to have as little code as possible while
giving proposed solutions to as many typical real-world large app problems as possible.
* An example of a working AngularJS app with end-to-end tests running against a mocked $httpBackend.
* An example of how to manage default versus prod/dev/individual configs for your app
* An example of how get resourse revving _really_ working. See details below.
* An example of how to get html partials preloaded _with_ revving.

## What this project is _not_

* a complete working app
* a yeoman generator (but it would be nice to wrap it into one as it matures)
* a guide to AngularJS (for that go read the [docs](http://docs.angularjs.org/guide/))
* a guide to how to write good TypeScript (for that get started with the [spec](http://go.microsoft.com/fwlink/?LinkId=267238) and [this post](http://blogs.msdn.com/b/typescript/archive/2013/01/24/interfaces-walkthrough.aspx))
* a guide on how to write unit tests (you could start [here](http://docs.angularjs.org/guide/dev_guide.unit-testing))
* a guide on writing e2e tests (for some of that, work through [the tutorial](http://docs.angularjs.org/tutorial))

## Why AngularJS?

Because it's superheroic. That aside, the angular guys did a great job on
a number of fronts. The documentation is fairly decent, the feature set is
close to complete, the division between controllers, directives, and services
enforces a nice structure on your project. You can get rather deep without ever
having to look "under the hood". Promises of values being treated no different
than actual values in the data-bound views are nice.

Most importantly, angular folks made it a priority to make the framework compatible
with simple vanilla JavaScript. You write functions, and are not forced to extend
some heavily constraining class hierarchy. This makes it easy to integrate Angular
with TypeScript.

## Why TypeScript?

Have you ever gotten an error `"TypeError: Object #<Object> has no method 'blah'"` on
the console in a browser? Chances are you've wasted many hours debugging such errors.
And it could have been in large part avoided.

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

The powerful interface definition syntax allows you to add type annotations to
existing JS libraries, making interop between TypeScript and JS trivial yet type-safe
when desired.

## What's with the E2E part?

Angular comes with an e2e test runner, and provides you with a way to mock a fake http
backend for your e2e tests. Sadly there are no official examples of how to get this
stuff working in the context of a real application. The yeoman angular generator, while
awesome, is also lacking in this department (at least at the time of writing).

So I want to put out a working example of e2e tests with a mocked backend.

## Why not ToDoMVC?

I feel that ToDoMVC has come to represent a rather meaningless `Hello, World!` example,
and tends to be implemented with the goal of writing as little code as possible so as
to win in an arguably pointless category of comparison--brevity when writing _trivial_
apps. I am trying to put together an example that better demonstrates what writing
a real-world large application would feel like.

This is also not meant to be a complete working application. I am doing the minimum
necessary to show off how TypeScript could be used together with AngularJS,
and to make end-to-end testing work.

## Okay, how do I get this running on my machine?
1. install [node](http://nodejs.org/)
1. clone the repo; all subsequent commands to be run in the repo root
1. `sudo npm install -g yo grunt-cli bower`
1. `npm install`
1. `bower install --dev`
1. `sudo npm install -g typescript`
1. `sudo gem install sass`
1. `sudo gem install compass`
1. `pushd fake_backend && npm install && popd`
1. `touch app/config_overrides.js`


## Now that I have it, how do I see it in action?

You'll need two terminal windows. In one, run the simple backend server

`cd fake_backend`

`node app.js`

In the other one, run

`grunt server`

Yes, the page with a header and four tasks is all you're expecting to see.

## And you said something about testing?

### Brief note about unit and e2e testing in AngularJS

Angular sets out to arm you with a powerful set of tools for testing your application.
In particular, the dependency injection framework allows you to easily mock various
components and thus test your code in a highly controlled fashion.

There are three flavours of testing that are of interest to me.

#### Unit tests with mocked, injected services

Say you're testing a controller that relies on a service. One way to test this
controller is to write a fake service, just a JS function, that is used in place
of the real service during the test. `test/spec/controllers/TasksController.js`
illustrates this approach; the mocked `TaskService` is in `test/mocks/services/TaskService.js`.

#### Unit tests with mocked $httpBackend

Sometimes you may want to unit test a service that gets its data from a remote
backend. In this case, you could mock out a fake $httpBackend to return hardcoded
data against which to test. `test/spec/services/TaskService.js` is an example of
this approach.

#### E2E tests with a mocked $httpBackend

This is, in a way, the holy grail of testing, in that you get to test the app that
the user actually interacts with. For predictability reasons it is often desired
to hardcode some of the responses that would otherwise come from a remote server,
while letting the other requests straight through. `test/e2e/tasks.js` is an example
of this approach. Configuration of what requests get mocked and which are let through
happens in `test/e2e/appTest.js`, and the mocked data is supplied in
`test/mocks/data/tasks.js`. All this is brought together in `app/index-e2e.html`.

### Actually running the tests

`grunt unit`

will run unit tests.

`grunt unit_watch`

will run unit tests, and will then sit, watching for changes in all your
`test/**/*.js` files, as well as your `.js` files in the `app/scripts` directory.
Note that this does not directly include changes to `.ts` files. You have to have
a separate grunt task running that watches your `.ts` files and compiles them into
the `tslib.js` file, changes to which will then be picked up by the test runner.
This can be either the `grunt server` task, or just the `grunt watch:typescript` task.

Why don't you run this task, open `test/spec/controllers/TasksController.ts` in
your favourite editor, and change `toBe(2)` to `toBe(3)` and watch the test fail.
Now fix it back to `2`. Good. In another terminal window, run
`grunt watch:typescript`, edit `app/scripts/controllers/TasksController.ts` and
comment out the line that sets `$scope.tasks` in the constructor. Watch the unit
test fail.

`grunt e2e`

will run end-to-end tests.

`grunt e2e_watch`

will do just what you expect it to. The interesting bit about this task is
that it lets you see what's happening in the test runner. Switch to the spawned
Chrome window and click the `debug` button. You get to see some details about the
tests.

You can also run e2e test manually by running good old

`grunt server`

and then hitting up http://localhost:9000/test/runner.html in your browser. This
could help when debugging something.

Finally, it is often useful to run the mocked version of the app directly. Perhaps
you're doing backend-less development, or just want to debug e2e tests. Run `grunt server`
and go to http://localhost:9000/index-e2e.html in your browser.

## Differences from Yeoman's angular generator

This project is based on the awesome Yeoman scaffolder and the accompanying Grunt
set of tasks that help with development and building the production dist. There are
a few differences.

### Order of compass and image minification

In the original `Gruntfile` that comes from `generator-angular`, the image minification
task comes after compass. This is a problem if you like having minified images
inlined into your css. I reordered the tasks. Details of the plumbing is in the
comments in `Gruntfile.js`.

The supplied code includes a background style that uses an inlined image to demonstrate
that all of this works.

### Other

* To get both unit and e2e tests running the way I like them, I tweaked both the karma
configs and the testing related Grunt tasks.
* config system included
* caching of partials
* build success verification
* revving working will all our use cases

## Features worth noting

### API typing

Note the files in app/scripts/shared/. These are used to give typing information
to the request and response bodies of the HTTP APIs, which is nice because you
have typed data coming in, as long as the server complies.

If you happen to write your backend in node, you can share the directory (via a git repo)
with the backend, and the two will now have a tighter contract that is type checked.

### TypeScript's `private` keyword in the constructor signature

My first impression of this keyword is that while it reduces duplication and clutter
in code, it also reduces readability by having instance variables listed in two
different locations in the file. So far I have been sticking with the following
convention: use `private` in the constructor signature only on variables representing
dependency injected services. That way, if you need to look up an instance variable,
it's always at the top of the class, and if you need to look up a DI'ed service, it's
always in the constructor signature.

### The "typing chasm"

TypeScript does not yet support generics, which creates "typing chasms", places in
code where typing information is lost, and it is up to the developer to recover it
on the other end of the chasm.

An ng.IPromise is a typical example. We cannot yet say
`ng.IPromise<Task>`, so inevitably when we have `taskPromise.then((data) => {})`, it is
up to us to recover the typing information in the callback to `then`. So you are
encouraged to write `taskPromise.then((task: Task) => {})`, but even if you write
`taskPromise.then((elephant: Elephant) => {})`, the TypeScript compiler will not
complain.

### Public members on model objects

It tends to be helpful to make public members that would have been private due
to information hiding in classic OO, for the purposes of data binding. Getter
functions are the classic way to preserve information hiding yet expose the value
to the users of the class, but Angular has no way of marking a return value of a
function as "visited", and will thus keep evaluating the function on every digest
cycle, irrespective of whether the data has changed or not, which is prohibitively
wasteful.

### Source maps

In Chrome dev tools' settings, check "enable source maps". If you now toss in a `debugger`
statement somewhere in your `.ts` source code, when you hit that breakpoint in the
browser, you'll be looking at your TypeScript code, not the generated `tslib.js`.

### Config system

It's typical to need to pass a set of config variables to the app, e.g. the backend
server URL that the app is supposed to hit. I propose the following solution.

Two config files are included in `index.html`

* `app/config.js`, which defines a JS variable and assigns an object literal to it,
containing the default config values. This file is kept in the code base. The authors
are encouraged to set defaults that will let the app work out of the box.
* `app/config_overrides.js`, which possibly changes the values of a subset of the fields
defined on the variable in `config.js`. This file is _not_ kept in the code base. Each
developer will have their own overrides, and a production version will be deployed as
part of the deployment (and managed separately, by puppet or whatever other software is
used for deploying). `config_overrides.sample.js` is provided for reference.

This JS variable is then added to the dependency injector as a constant, and can be injected
into whichever service/controller/directive/etc needs access to the config values.
See `TaskService.ts` for an example of how it's used.

In dev, these two files are loaded as `<script>` nodes, while in an environment where
the static `index.html` file is served by varnish or something similar, edge-side-includes
are used to inline the contents of the config.

### Build

The build process is still a work in progress. I've been modifying the default generator-angular's
build task to fit the needs of this project.

The fake_production directory now has a simple express server running on port 4000, pointing
at the dist directory that is the artifact of the build process. Revisioning works, at least for
the set of tests that I did (CSS bundle is correctly versioned and pulled in, as is the scripts bundle,
and images refered by `url(...)` in CSS and through `<img src...>` in HTML. Nested directories work.

### Resource revving and html partials cache priming

When serving this stuff in production, it is desired that every resource other than index.html has
far future expires headers set, and invalidation happens by virtue of the URLs changing. Revving
with grunt-rev accomplishes that, but there are details that take work to get right.

We also don't want to the user agent to fire a hundred request for partials, and want to instead deliver
them as a single bundle. The grunt-html2js task helps us with building the bundle, but there is a bunch
of chicken and egg problems that happen. For example, we need to make sure the bundled partials have already
had their asset references updated to revved versions. We also need to rev the partials bundle itself. We
also need to make sure that the final copy of index.html refers to the revved templates bundle. Finally,
dev should still work without any of this getting in the way.

See comments and build task layout inside the Gruntfile to see how all this works.

Since the build process has gotten rather involved with the revving and partials caching, we built a
grunt task the verify success of the build. Its job is to basically check that whatever needs to be
revved is, and that whatever needs to reference revved versions of files, does.

## TODO and wishlist

### More AngularJS samples
* directive
* filter


### Duplication in index.html and index-e2e.html

Either you end up writing ugly branching inside index.html to support both dev
and prod in one file, or you end up branching them, keeping each file clean, but
having duplication between the files. I chose the latter as the lesser of two evils,
but am still hoping for a better solution to eventually emerge, one that removes this
duplication.

That said, given that most of your js will be delivered as the compiled lib, and
your css can be delivered as a top level main.css file put together with compass,
changes to the index.html file that need to be compied over to index-e2e.html will
hopefully be infrequent.

### Test related tasks

I wish there was a neater way to define the [unit|e2e]-[|watch] set of tasks that
avoids duplication. I'll revisit when I have some free cycles, though given that
the `Gruntfile` changes far less frequently than the main codebase of the given app,
I can live with the current definitions.

### Transforming versus copying

In the build process, files originate in the `app/` directory, get transformed
(it's sometimes an identity transform) and end up in the `dist/` directory. It so
happens that for most files the transformer task also ends up being the mover task.
Such coupling makes it impossible for me to easily turn off, say, minification, and
have the non-minified versions of the files copied automatically into the `dist/`
directory. This is likely only a problem for when you're actually tweaking the build
process, which few people will hopefully have to do.

## Origins

This setup is the result of tweaking the configs and the tools as part of working
on two distinct apps. Neither of them are in production as of this writing, and the
dev process is still evolving, so more changes should be expected.

## Anticipated questions

* Why are the tests in JavaScript, and not in TypeScript
	* Yeah, silly, I know. I started out with the tests that came with the yeoman
	  scaffold, and haven't bothered to transition them to TypeScript yet. I suppose
	  I wasn't convinced that there's much to be gained from the transition, other than
	  uniformity of language.

## Conclusion and credits

I've been frustrated with the state of web development for years. I feel that now
we are, for perhaps the first time ever, well-equipped for building large, complex
yet robust applications that work in the browser. This is possible thanks to the
fine folks who created:

* [AngularJS](http://angularjs.org/)
* [TypeScript](http://www.typescriptlang.org/)
* [Yeoman](http://yeoman.io/)
* [Grunt](http://gruntjs.com/)
* [Node](http://nodejs.org/)
* [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped)
* [Compass](http://compass-style.org/)
* [Bower](http://twitter.github.com/bower/)

and many others.

