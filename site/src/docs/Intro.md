
Stylo is a set of utility components and functions for quickly building theme-based user interfaces.

It's **loosely** based on [Styled System](https://styled-system.com/) ideas and [Theme specification](https://system-ui.com/theme).

Styling is applied using normal Svelte properties, taken from [a theme-aware set of CSS properties (and shorthands)](./properties.md).

Example:

```js
<Panel
  bg="surface" 
  color="secondary++"
  border 
  shadow="lg"
  rounded="md"
  p="nm" pr="lg" pl="lg"
  m="md">
  A panel with background, color, border, shadow, radii, padding
  and margin using default Theme values
</Panel>
```
<button on:click={toggleExample}>Show me</button>

<PanelExample bind:show={exampleNum}></PanelExample>

## Layout components

The basic building block for creating a UI. All layout components are unstyled by default, as they usually act as containers for other UI components.

- `Page`: Container occupying the full device viewport, where the other layout or elements are positioned.

- `Panel`: A basic Div block, acting as a container for other panels and boxes. Supports flex items inside it. Usually takes the full width of its container. Useful for building navbars, sidebars, drawers, vertical and horizontal sheets, footers, content areas, cards, etc.

- `Box`: A basic inline-block content area, acting as container for smaller elements (such as icons, text, etc). It´s size is usually defined by its content. By default all content outside the box will be "clipped" (overflow=hidden). Useful for building buttons, card parts, list items, media containers, etc.

- `Overlay`: An obscured overlay taking full height and width, whose contents are displayed on top of the current page. It can be closed by clicking outside it's content, or controlled by the displayed component (modal).

- `Dialog`: A particular case of an Overlay, where it's content is vertically and horizontally centered.

- `Popover`: A content area displayed on top of other components, whose visibility is triggered by a Target component. Only one Popover can exist at the same time. Triggering a new one automatically closes all others. Useful for building menus, dropdowns, fly-outs, tips, and many other UI components.

- `Target`: A small content area (an anchor) that, when clicked or selected, triggers the visibility of some other component (usually a Popover).

## Element components

- Button

- Check

- Icon

- Input

- Label

- Radio

- Select

- Text

<script>
  import { Panel } from './stylo'
  import PanelExample from './examples/panels.svelte'

  let exampleNum = null;

  function toggleExample() {
    exampleNum = 1 ;
  }
</script>
