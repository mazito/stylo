{#if show}
  <div 
    on:click 
    class="panel { css && css.classes(vw) }"
    style={ css && css.styled(vw) }
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
  import { Css } from '../theme';
  
  export let 
    show = true;

  let 
    vw = 0,
    css = Css($$props);
    
  $: if (vw && $$props) {
    show = css.visible(show, vw);
    // console.log("$ Panel vw=", vw, show)
  }
</script>