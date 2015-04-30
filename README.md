# viewSwitcher
A very basic View Switcher for single-page Websites. 

See the [Full Page Example](http://kevingimbel.com/viewSwitcher/examples/fullpage/#start) or the [quick 'n dirty documentation](http://kevingimbel.com/viewSwitcher/#documentation) for more information. There's also a [CV example](http://kevingimbel.com/viewSwitcher/examples/cv) to show how to create a two language CV using viewSwitcher.

## Basic Usage

1. Load the Scripts
```html
<script src="path/to/viewswitcher.min.js"></script>
```

2. Set up views by adding a `data-view` attribute to the wrapping element.
```html
<section data-view="hello">
  <h1>Hello!</h1>
</section>


<section data-view="world">
  <h1>World!</h1>
</section>
```

3. Initiate default views and generate a menu (if you wish).
```js
// Set options, currently only changeTitle is supported which prevents
// the page Title from being changed.
View.setOptions({
  changeTitle: false
})
// if no #hash is set, active the data-view="hello" View
View.initActive('hello'); 

// get a nav container
var nav = document.querySelector('nav');
// add the generated HTML to the nav container, the
// argument passed to getHtmlMenu is a string representing
// the class name assigned to all <li> elements.
nav.innerHTML = View.getHtmlMenu('list__item');
```
