import { Panel } from './stylo'

**Stylo** is a set of utility components for quickly building theme-based user interfaces.

It's (very loosely) based on [Styled System]() ideas an [Theme specification]().

They can be "styled" using a limited set of CSS properties (and shorthands), used as normal Svelte properties.

Example:

~~~
<Panel 
  bg="surface"
  color="primary"
  border="3"
  shadow="lg"
  p="nm">
  A panel with background, color, border and shadow values using the <b>default Theme</b>.
</Panel>
~~~

# Layout components

The basic building block for creating a UI. All layout components are unstyled by default, as they usually act as containers for other UI components.

- `Page`: Container occupying the full device viewport, where the other layout or elements are positioned.

- `Panel`: A basic Div block, acting as a container for other panels and boxes. Supports flex items inside it. Usually takes the full width of its container. Useful for building navbars, sidebars, drawers, vertical and horizontal sheets, footers, content areas, cards, etc.

- `Box`: A basic inline-block content area, acting as container for smaller elements (such as icons, text, etc). It´s size is usually defined by its content. By default all content outside the box will be "clipped" (overflow=hidden). Useful for building buttons, card parts, list items, media containers, etc.

- `Overlay`: An obscured overlay taking full height and width, whose contents are displayed on top of the current page. It can be closed by clicking outside it's content, or controlled by the displayed component (modal).

- `Dialog`: A particular case of an Overlay, where it's content is vertically and horizontally centered.

- `Popover`: A content area displayed on top of other components, whose visibility is triggered by a Target component. Only one Popover can exist at the same time. Triggering a new one automatically closes all others. Useful for building menus, dropdowns, fly-outs, tips, and many other UI components.

- `Target`: A small content area (an anchor) that, when clicked or selected, triggers the visibility of some other component (usually a Popover).

# Element components

- Button

- Check

- Icon

- Input

- Label

- Radio

- Select

- Text


Helpers
-------


## `Stylo` methods

- css(props) @returns: a CssProps object

- theme() @returns: a Theme object


## `CssProps` methods
 
- blacklist(['',...]): this

- whitelist(['',...]): this
  
- shorthand(['option', ], 'css-property'): this

- styled(): string

- classes(): string


## `Theme` methods

- build(name: string, theme: object)

- FUTURE: import(name: string, theme: object, format: string)

- active(name: string): Theme

- wireframes(state: boolean)

- breaked(points: array): boolean
  
~~~
  import Stylo from 'stylo'

  let css = Stylo.css($$props)
            .whitelist(['',...])
            .blacklist(['',...])
            .shorthands(['xs','sm','nm'], 'font-size')
            .shorthands(['left','right','center'], 'text-align')

  let theme = Stylo.theme()

  let color = theme.value(css.color, 'colors')

  let backg = theme.value(css.backgroundColor, 'colors')

  let styles = css.styled()

  let classes = css.classes()
~~~
