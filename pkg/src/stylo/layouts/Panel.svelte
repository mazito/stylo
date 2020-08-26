{#if show}
  <div 
    on:click 
    class="panel { css && css.classes() }"
    style={ css && css.styled() }
    >
    <slot></slot>
  </div>
{/if}

<style>
.panel {
  box-sizing: border-box;
  display: block;
  position: relative;
  padding: 0;
  margin: 0px; 
  overflow: auto;
  z-index: 0;
  /* debug */
  background-color: transparent;
}

.flexed {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-content: stretch;
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
    console.log("$ Panel vw=", vw, show)
  }
</script>