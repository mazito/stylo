{#if show}
  <div 
    on:click
    class="box { css && css.classes() }"
    style={ css && css.styled() }
    >
    <slot></slot>
  </div>
{/if}

<style>
.box {
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  padding: 0;
  margin: 0px; /* FIX porque si no quedan espacios entre Boxes */
  overflow: hidden;
  z-index: 1;
}
</style>

<svelte:window bind:innerWidth={vw} />

<script>
  import Css from '../css'

  export let 
    show = true;

  let 
    vw = 0,
    css = null;
    
  $: if (vw) {
    css = Css($$props);
    show = css.visible(show);
    console.log("Box", css)
  }
</script>