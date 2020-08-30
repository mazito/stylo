{#if show}
  <button
    on:click
    class="button { css && css.classes() }"
    style={ css && css.styled() }>
    <slot></slot>
  </button>
{/if}

<style>
.button {
  display: inline-block;
  box-sizing: border-box;
  font-size: 100%;
  font-weight: normal;
  font-style: normal;
  line-height: 1em;
  word-wrap: normal;
  white-space: nowrap;
  margin: 0; /* fix because default button has unneeded margin */
  /* dont' touch padding */
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
  
  $: if (vw) {
    css = Css($$props)
      .shorthand(['xs','sm','nm','md','lg','xl'], 'font-size')
      .shorthand(['normal','bold','thin'], 'font-weight')
      .shorthand(['center','left','right','justify'], 'text-align')
      .shorthand(['nowrap'], 'white-space')
      .shorthand(['middle','top','bottom'], 'vertical-alignment')
    show = css.visible(show);
  }
</script>