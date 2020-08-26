{#if show}
  <div 
    class="page { css && css.classes() }"
    style={ css && css.styled() }
    >
    <slot></slot>
  </div>
{/if}

<style>
.page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom:0;
  box-sizing: border-box;
  padding: 0;
  margin:0;
  z-index: 0;
  overflow: auto;
}

:global(.wireframe) {
  border: 1px dashed #FF0000;
  margin: -1px; /* FIX to adjust for the border width */
}

:global(.hover:hover) {
  background-color: #eeeeee !important;
  color: #000 !important;
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
    css = Css($$props);
    show = css.visible(show);
    console.log("Page", css)
  }
</script>
