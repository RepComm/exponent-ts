# exponent-ts
Fast and clean HTML, with templating + method chaining in mind<br/>
0 dependencies - typescript, javascript

## Origin
What started as aliasing DOM APIs (_a nasty habbit.. I'm trying to quit_)
evolved into writing reusable classes<br>
<br>
Then I wanted a standard that would work in most scenarios<br>
<br>
Soon the `Component` class was born, and eventually switched to typescript.<br>
<br>

Exponents are simply implemented versions of<br>
common components that should have to be rewritten, but you're not forced to use them :)

The Component class itself is pretty small, and<br>
essentially serves as a convenient chain-method wrapper for HTML elements

## Exponents (premade components)
 - Grid - internally uses display:grid
 - Button - sets up css to make buttons flex properly
 - DualPanel - mount 2 elements w/ ratio, direction
 - ContextPanel - render single component from set, switch using string IDs
 - ImagePanel - adds functionality for fitting the image
 - Knob - rotation input with configurable turn and value bounds
 - OverlayPanel - render two components on top of each other in a panel
 - Panel - your basic container (think div, but with all the flex stuff)
 - SquarePanel (non-final) - the component mounted will always have ratio 1:1 dimensions
 - Drawing - canvas component w/ built in auto-resize, render loop, render passes, helper methods

## Planned Exponents
 - List
 - Paged List (for large lists)
 - Toggle Button
 - Number
 - Multi-select
 - Slider

## Planned features
 - Track object properties
 - Serialize to JSON
 - Visual drag'n'drop editor

## Visuals
![img](./example.png)

## Example
TODO

