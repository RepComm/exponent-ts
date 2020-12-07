# exponent-ts
My personal solution to user iterfaces w/ HTML

## How this came to be
What started as aliasing DOM APIs (_a nasty habbit.. I'm trying to quit_)
evolved into writing reusable-ish classes<br>
<br>
Then I wanted a standard that would work in most scenarios<br>
<br>
Soon the `Component` class was born, and eventually switched to typescript.<br>
<br>

The Exponent part is just implemented versions of<br>
standard components that I'll use in [openbf](https://github.com/openbf-project)

The Component class itself is pretty small, and<br>
essentially serves as a convenient chain-method wrapper for HTML elements
## Implemented Components
 - Grid
 - Button
 - DualPanel - render 2 elements w/ ratio
 - ContextPanel - render single element from set, switch using string IDs
 - ImagePanel
 - Knob - a rotation based input with configurable turn and value bounds
 - OverlayPanel - replaced with Grid
 - Panel - single element container
 - SquarePanel (partial) - always square, even if child/parent element isn't
 - Drawing - canvas component w/ built in auto-resize, render loop, render passes, helper methods

## Planned Components
 - List
 - Paged List (for large lists)
 - Toggle Button
 - Number
 - Multi-select
 - Slider

## Planned features
 - Track object properties

## Visuals
![img](./example.png)

## Why does this exist
1. I hate jQuery (and other UI frameworks)
2. I love command chaining
3. I want to reuse more / write less
4. I needed it for https://github.com/openbf-project
