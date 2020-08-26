
Componentes
===========

## Layout

Page ok

Panel ok

Box ok

Overlay ok

Popover ok, positioner FALTA

Target

Dialog ? == Overlay with Pane ... con ciertas opciones ...


## Content

Text

Link

Image

Icon


## Kit

Menu

Dropdown

Incluir o no ???

Checkbox

Select

Radio

Input

Textarea

---

Properties
----------

Theme-aware properties

CSS Property | Stylo Prop | Theme Key

fontFamily | font | fonts

fontSize | size, shorthands: xs,sm,mn,md,lg,xl,h2,h1 | fontSizes

fontWeight | weight, shorthands: bold, normal, thin, bold+m thin- | fontWeights

lineHeight	| line | lineHeights
|letterSpacing	| | letterSpacings
color	| | colors
backgroundColor | back	| colors

margin | m	| spaces
margin-? | m?, shorthands: mt,ml,mr,mb,mx,my	| spaces
padding | p	| spaces
padding-? | p?,	shorthands: pt,pl,pr,pb,px,py | spaces

top	| top | coordinates
bottom | bottom |  coordinates
left | left | coordinates
right	| right | coordinates

border | border | borders
borderLeft | borderLeft | borders
borderRight | borderLight | borders
borderTop | borderTop | borders
borderBottom | borderBottom | borders

borderRadius | round, rounded |	radii

boxShadow	| shadow | shadows
textShadow | shadow | shadows 

width	| w | sizes
height | w | sizes
size | size | sizes

minWidth | minw | sizes
maxWidth | maxw | sizes
minHeight | minh | sizes
maxHeight | maxh | sizes

zIndex | z | elevations

Responsive
----------

### Configuration

Example breakpoints configuration:

~~~
Theme.breakpoints = {
  'xs': 320,  // > 0 && =< 20 rem ~ Small Phone
  'sm': 480,  // > 20rem && =< 30 rem ~ Phone
  'md': 720,  // > 30 && =< 45 rem ~ Tablet Vertical
  'lg': 1024, // > 45 && =< 64 rem ~ Tablet Horizontal
  'xl': 1360, // > 64 && =< 85 rem ~ Laptop
  'wl': 3200  // > 85 rem ~ Wide screen
}
~~~

### Assign to a `prop`

To conditionaly assign to a `prop`  based on the actual breakpoint, you can use, a `responsive` object, as in the example:

~~~
  <Box p={{'xs': 'sm', 'sm': 'sm', '*': 'nm'}}>
    ... 
  </Box>
~~~

Where `*` indicates it applies to all other beakpoints.

Stylo will detect you are passing an object, and apply the correct value depending on the current breakpoint.

### Helper `inBreaks()` function

Returns `true` if it's inside one of the given breakpoints.

Examples:
~~~
  let isSmall = inBreaks(['sm']) // > xs && =< sm

  let isMediumOrSmall = inBreaks(['sm','md']) // > xs && =< md

  let isWide = inBreaks(['wl']) // > xl
~~~


Css "pass-thru" properties
--------------------------

overflow

/*
borderTop	| borders | borders
borderRight	| |borders
borderBottom	| |borders
borderLeft | |borders
borderColor	| boderColor | colors
borderWidth	| borderWidth | border.widths
borderStyle	| borderStyle | border.styles
*/ 
