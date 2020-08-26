# Stylo

A set of utility components and functions for quickly building theme-based user interfaces in Svelte.

It's **loosely** based on [Styled System](https://styled-system.com/) ideas and [Theme specification](https://system-ui.com/theme), but implemented as pure Svelte components (without any external dependencies).

Styling is applied using normal Svelte properties, taken from [a theme-aware set of CSS properties (and shorthands)](./properties.md).

Example:
```html
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

## Status

**This is work in progress**

## Doumentation

For full documentation and examples visit [Stylo](https://stylo.treme.io)
