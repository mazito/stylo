<!--
@component Form

An HTML standard Form container, styllable with themes.

By default it is a block component, with some styles reseted.

Delegates all clicks to its container.
-->
{#if show}
  <form 
    on:click
    class="form { css && css.classes(vw) }"
    style={ css && css.styled(vw) }
    >
    <slot></slot>
  </form>
{/if}

<style>
.form {
  box-sizing: border-box;
  display: block;
  position: relative;
  padding: 0;
  margin: 0px; /* FIX porque si no quedan espacios entre Boxes */
  overflow: auto;
  z-index: 1;
}
</style>

<svelte:window bind:innerWidth={vw} />

<script>
  import { Css } from '../theme';
  
  export let 
    show = true;

  let 
    vw = 0,
    css = Css($$props);
    
  $: if (vw && $$props) {
    show = css.visible(show, vw);
    // console.log("Form", css)
  } 
</script>