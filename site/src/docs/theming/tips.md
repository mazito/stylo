[Stylo](#/home) > [Theming]()

# Tips & Tricks 

## Use CSS variables for special cases

Modifiers such as `:focus` and `:hover` are difficult to implement using only `style` properties.

In this cases we have defined special CSS variables that will be included in the `style` attribute, and can be used inside the `<style>` part of the component.

Of course, this CSS variables are also "theme aware".

Here is an example of how it is used in the `Input`component:

Another component using `Input`:

```javascript
<Input focus-background="light" ... />
```

Inside the `Input`component:

```javascript
<style>
  input:focus {
    outline-width: 0px;
    outline-color: transparent;
    background-color: var(--focus-background);
    padding-left: 4px;
  }
</style>
```

**Credits**: Idea taken from [Javascript Interpolation in Styles via CSS Variables? #758](https://github.com/sveltejs/svelte/issues/758) by [Christopher Olah](https://github.com/colah).