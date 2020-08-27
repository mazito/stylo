{#if show}
  <div 
    on:click
    class="box { css && css.classes(vw) }"
    style={ css && css.styled(vw) }
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
  import { Css } from '../theme';
  
  export let 
    show = true;

  let 
    vw = 0,
    css = Css($$props);
    
  $: if (vw && $$props) {
    show = css.visible(show, vw);
    // console.log("Box", css)
  } 
</script>