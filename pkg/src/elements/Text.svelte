<!--
@component Text

A stream of text inside a Box or Panel. 

It is ALLWAY 'inline' so margins and padding may not be allways fully consistent.

Shorthand properties:

- `xs`,`sm`,`nm`,`md`,`lg`,`xl`,`xxl` for setting `font-size` using the Theme values.

- `thin`,`normal`,`bold`: for setting `font-weight` using the Theme values.

- `italic`: for setting `font-style` using the Theme values. Default is 'normal'.

- `underline`:

- `center`, `left`, `right`: for `text-align` inside the block.

- `middle`,`top`,`bottom`: for `vertical-alignment` inside it's container.

- `nowrap`: sets 'white-space=nowrap' and 'overflow=hidden' to avoid exceeding the block width.

- `hyphens`: will allow hyphenation (if possible at all in the language).

Other special properties:

- `family`: not included !

- `size`: for a measured ("10px", etc..) `font-size`of the given text.  

- `weight`: for a numeric ("100", "200", etc...) `font-weight`of the given text. 

- `spacing`: for `line-height` of the given text. Can use one of the Theme constants.

- `m` and `p` and it's variants: for `margin` and `padding` as usual.

- `w`,`maxw`,`h`,`maxh`,`color`,`background`: as usual. 

- `rotate` property ??? for rotated text ?

,``,``,``,``,``,``,
-->
{#if show}
  <span
    class="text { css && css.classes() }"
    style={ css && css.styled() }>
    <slot></slot>
  </span>
{/if}

<style>
.text {
  display: inline;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  font-style: inherit;
  word-wrap: normal; /* or ? break-word; */
  white-space: normal;
  hyphens: inherit; /* from the global.css setting */
}
</style>

<svelte:window bind:innerWidth={vw} />

<script>
  import { Css } from '../theme';
  
  export let 
    show = true;

  let 
    vw = 0,
    css = null;

  $: if (vw && $$props) {
    css = Css($$props)
          .shorthand(['xs','sm','nm','md','lg','xl','h4','h3','h2','h1'], 'font-size')
          .shorthand(['italic','underline'], 'font-style')
          .shorthand(['normal','bold','thin'], 'font-weight')
          .shorthand(['center','left','right','justify'], 'text-align')
          .shorthand(['nowrap'], 'white-space')
          .shorthand(['middle','top','bottom'], 'vertical-alignment')
    console.log("Text show1=", show)
    show = css.visible(show, vw);
    console.log("Text show2=", show)
  }
</script>