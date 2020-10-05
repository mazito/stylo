# Stylo

Stylo is a set of utility components and functions for quickly building theme-based user interfaces using Svelte.

It's **loosely** based on [Styled System](https://styled-system.com/) ideas and [Theme specification](https://system-ui.com/theme), but implemented as pure Svelte components (without any external dependencies).

Styling is applied using normal Svelte properties, taken from [a theme-aware set of CSS properties (and shorthands)](./properties.md).

Example:

```javascript
<Overlay bind:show={show} centered>

  <Panel 
    bg="surface" color="black" border shadow="lg" rounded="sm"
    p="lg" pb="md" maxw=30 line="double">

    A Panel with background, color, border, shadow, radii, 
    padding and margin using default Theme values.
    <br>

    <Box 
      color="body">
      Click outside of this Panel for closing, or 
      <Button 
        nm hover bg="surface" color="primary"
        on:click={() => {show=false;}}
        >Click me !
      </Button>
    </Box>

  </Panel>
</Overlay>

<script>
  import { Panel, Box, Overlay, Button } from 'svelte-stylo'

  export let show = false;

</script>
```
<Button on:click={toggleExample}>Show me</Button>

<PanelExample bind:show={exampleNum}></PanelExample>

This examples uses:

- The [Overlay](#/overlay) component for displaying the example on top of this. It also manages closing itself when clicking ouside of the content area.

- The [Panel](#/panel) component for defining the visible content area, and its properties (border, shadow, padding, etc).

- The [Box](#/box) component for defining a small area inside the main Panel, containing some text and the close button.

- A [Button](#/button) partially reestiled which can be used to close the Overlay.


## Layout components

The basic building block for creating a UI. All layout components are unstyled by default, as they usually act as containers for other UI components.

- `Page`: Container occupying the full device viewport, where the other layout or elements are positioned.

- `Panel`: A basic `div block`, acting as a container for other panels and boxes. Supports flex items inside it. Usually takes the full width of its container. Useful for building navbars, sidebars, drawers, vertical and horizontal sheets, footers, content areas, cards, etc.

- `Box`: A basic `inline-block content area`, acting as container for smaller elements (such as icons, text, etc). It´s size is usually defined by its content. By default all content outside the box will be "clipped" (overflow=hidden). Useful for building buttons, card parts, list items, media containers, etc.

- `Overlay`: An obscured overlay taking full height and width, whose contents are displayed on top of the current page. It can be closed by clicking outside it's content, or controlled by the displayed component (modal).

- `Dialog`: A particular case of an Overlay, where it's content is vertically and horizontally centered.

- `Popover`: A `floating content area` displayed on top of other components, whose visibility is triggered by a Target component. Only one Popover can exist at the same time. Triggering a new one automatically closes all others. Useful for building menus, dropdowns, fly-outs, tips, and many other UI components.

- `Target`: A small content area (an anchor) that, when clicked or selected, triggers the visibility of some other component (usually a Popover).

## Element components

- Button

- Check

- Icon

- Input

- [Label](): a `small inline-block of text`, also usable as a classic form label. Useful for exactly positioning text in cards, graphs, list items, etc.

- Radio

- Select

- `Text`: a `flow of inline text`, similar to a `span` element.

<script>
  import { Panel, Button } from 'svelte-stylo'
  import PanelExample from '../examples/panels.svelte'

  let exampleNum = null;

  function toggleExample() {
    exampleNum = 1 ;
  }
</script>
