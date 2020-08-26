{#if show}
<div>
  <div 
    class="overlay { css && css.classes() }" 
    transition:fade="{{delay: 20, duration: 300}}"
    >
  </div>
  <div 
    on:click|self={ ()=>{ show = !modal ? false : show ; }}
    class="content" 
    transition:fade="{{delay: 150, duration: 300}}"
    >
    <div class="{ centered ? ' centered': '' }">
      <slot></slot>
    </div> 
  </div>
</div>
{/if}

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom:0;
  box-sizing: border-box;
  padding: 0;
  margin:0;
  z-index: 1;
  overflow: hidden;
  background-color: #666;
  opacity: 0.5;
  /* debug */
  --border: 1px dotted red;
}

.overlay.transparent {
  background-color: transparent !important;
  opacity: 0 !important;
}

.content {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom:0;
  box-sizing: border-box;
  padding: 0;
  margin:0;
  z-index: 2;
  overflow: auto;
}

.centered {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>

<svelte:window bind:innerWidth={vw} />

<script>
  import { Css } from '../theme';
  
  export let 
    show = false,
    modal = false,
    centered = true;

  let 
    vw = 0,
    css = null;
    
  $: if (vw) {
    css = Css($$props);
    show = css.visible(show);
  }
</script>