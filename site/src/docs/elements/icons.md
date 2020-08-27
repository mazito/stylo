[Stylo](#/home) > [Elements]()

# Icons

By default, icons are a `square inline-block`, have no borders or background, and use the default font size (1rem).

Only the `name` property is required. It is mapped to a "real icon" using the `icons` domain in the Theme specification, and the icon library or SVG files added to your proyect.

Icons are composed using a `icon-container block` and the `icon` itself. This allows setting the container size (using `h` and `w` properties) independently of the icon size (`font-size`) if neccesary.

## Properties:

| Name | CSS Property | Description|
|:--|:--|:--|
| `show` | - | shows or hides the icon | 
| `name` | - | the icon name in the selected icon set | 
| `size` | font-size | Shorthands: `xs`,`sm`,`nm`,`md`,`lg`,`xl`,`h2`,`h1` |
| `h` | height | by default, uses the `size` prop |
| `w` | width | by default, uses the `size` prop |
| `color` | color | |
| `bg` | background-color| |
| `border` | border | |
| `shadow` | box-shadow | |
| `rounded` | border-radius |  |
| `round` | border-radius=100% |  |

Other properties (such as padding, margin, etc.) can be used, but are rarely needed.

## Examples 

An icon with just the `default` props: <Icon name="close" />
```js
<Icon name="close" />
```

Setting it's size in different ways: <Icon name="close" h1 />
```js
<Icon name="close" h1 /> # using shorthand for `size`
<Icon name="close" size="h1" /> # using `size` property
<Icon name="close" font-size="h1" /> # using the CSS property `font-size`
```

Using a free value to set its size, including a border: <Icon name="close" size="4rem" border/>
```js
<Icon name="close" size="4rem" border />
```

Filled with `primary background color`: <Icon name="close" xl bg="primary" color="white"/>
```js
<Icon name="close" xl bg="primary" color="white"/>
```

A round icon: <Icon round name="close" h=2 xl bg="primary" color="white"/>
```js
<Icon round name="close" h=2 xl bg="primary" color="white"/>
```

A rounded (but not fully round) icon: <Icon rounded="sm" name="close" h=2 xl bg="primary" color="white"/>
```js
<Icon rounded="sm" name="close" h=2 xl bg="primary" color="white"/>
```

Rectangular icons setting the `h` and `w` properties:
<Icon h=2 w=4 bg="light" name="close" xl border="4"/>
<Icon h=3 w=1.8 bg="light" name="close" xl border="4"/>
```js
<Icon h=2 w=4 bg="light" name="close" xl border="4"/>
<Icon h=3 w=2 bg="light" name="close" xl border="4"/>
```

<script>
  import { Icon } from 'svelte-stylo';
</script>