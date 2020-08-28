
[Stylo](#/home) > [Elements]()

# Icons

```js
<Icon name="close" ... />
```

By default, icons are a `square inline-block` containing `svg`, have no borders or background, and use the default font size (1rem).

**The `name` property is required**: it must map to a file name in the Theme `icons` domain. Together with the Theme `iconsSource` path, is used to map it to a SVG file in your proyect.

Icons are composed using a `icon-container` and the `icon svg` itself. This allows setting the container size (using `h` and `w` properties) independently of the icon size (`size`) when neccesary (such as defining a tap zone much greater than the icon itself).


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

Using a free value to set its size, including a border: <Icon name="close" size="4rem" border="4"/>
```js
<Icon name="close" size="4rem" border />
```

Filled with `primary background color`: <Icon name="close" xl bg="primary" color="white"/>
```js
<Icon name="close" xl bg="primary" color="white"/>
```

A round icon: <Icon round name="close" h=3 xl bg="primary" color="white"/>
```js
<Icon round name="close" h=3 xl bg="primary" color="white"/>
```

A rounded (but not fully round) icon: <Icon rounded="sm" name="close" h=2 xl bg="primary" color="white"/>
```js
<Icon rounded="sm" name="close" h=2 xl bg="primary" color="white"/>
```

Rectangular icons setting the `h` and `w` properties:
<Icon h=2 w=4 bg="light" name="close" xl border="4"  color="secondary" hover/>
<Icon h=3 w=1.8 bg="light" name="close" xl border="4"/>
```js
<Icon h=2 w=4 bg="light" name="close" xl border="4"/>
<Icon h=3 w=2 bg="light" name="close" xl border="4"/>
```


## Properties:

| Name | CSS Property | Description|
|:--|:--|:--|
| `show` | - | Shows or hides the icon. | 
| `name` | - | The icon name. Must exist in the Theme `icons` set. | 
| `size` | font-size | Icon size. Can use shorthands: `xs`,`sm`,`nm`,`md`,`lg`,`xl`,`h2`,`h1` |
| `h` | height | Icon-container height. By default, uses the `size` prop |
| `w` | width | Icon-container width. By default, uses the `size` prop |
| `color` | color | Icon color. |
| `bg` | background-color| Background color of the icon-container. |
| `border` | border | Border value. Shorthand `border` sets the default border. |
| `shadow` | box-shadow | Shadow value. Shorthand `shadow` sets the default shadow. |
| `rounded` | border-radius | The radius for a rounded icon. |
| `round` | border-radius=100% | Creates a fully round icon. |

Other properties (such as padding, margin, etc.) can be used, but are rarely needed.


## Icon files

We assume SVG icon files similar to the [Material Design Icons collection](https://materialdesignicons.com):

```XML
<?xml version="1.0"encoding="UTF-8"?>
< !DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN""http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
    id="mdi-account-hard-hat"
    width="24"
    height="24"
    viewBox="0 0 24 24">
    <path
      d="M12,15C7.58,15 4,16.79 4,19V21H20V19C20,16.79 16.42,15 12,15M8,9A4,4 0 0,0 12,13A4,4 0 0,0 16,9M11.5,2C11.2,2 11,2.21 11,2.5V5.5H10V3C10,3 7.75,3.86 7.75,6.75C7.75,6.75 7,6.89 7,8H17C16.95,6.89 16.25,6.75 16.25,6.75C16.25,3.86 14,3 14,3V5.5H13V2.5C13,2.21 12.81,2 12.5,2H11.5Z" />
</svg>
```

Look at the `id=mdi-` prefix in the `svg` tag. It will be needed below.

**Notes**

- Icon files must be copied to a public accesible path (such as `public/assets/icons`), otherwise they will not be visible.

- Icon files MUST have a `.svg` extension (all lowercase).

- **Currently we only support SVG icons**. Thought this may require copying assets by hand into the proyect, I consider this to be an acceptable solution: SVG files have very small sizes, will be loaded only when required and can be properly cached by the browser.


## Theme setup

Setting up the Theme for using the icon files involves:

- setting `icons.source`: the public accesible path to the SVG files.
- setting `icons.prefix`: the prefix included in the `<svg id='xxx-'` tag in the file, as noted before. It must not include the file name. 
- setting `icons.files`: this is a dictionary, with an entry containing the SVG file name for each icon.

Example:

```JS
  icons: {
    prefix: 'mdi-',
    source: 'assets/@mdi/svg',
    files: {
      'close': 'close',
      'network': 'access-point-network',
    }  
  },
```


<script>
  import { Icon } from 'svelte-stylo';
</script>
