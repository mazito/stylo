{#if show}
  <div 
    on:click={ handleIt }
    bind:this={ me }
    class="target { css && css.classes(vw) }"
    style={ css && css.styled(vw) }
    >
    <slot></slot>
  </div>
{/if}

<style>
.target {
  box-sizing: border-box !important;
  display: inline-block;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
</style>

<svelte:window bind:innerWidth={vw} />

<script>
  import { Css } from '../theme';  
  
  export let 
    show = true,
    anchor; // used to toggle Popover on/off
  
  let 
    me = null,
    vw = 0,
    css = null;

  // initialize Anchor if undefined or empty
  anchor = anchor || {
    on: false,
    x: 0, y:0,
    bounds: { left:0, right: 0, top: 0, bottom:0 }
  };

  $: if (vw && $$props) {
    css = Css($$props);
    show = css.visible(show, vw);
  }

  function handleIt(ev) {
    /**
     * Toggles the On/Off state and 
     * @returns the state and coords 
     * in the binded @anchor object
     */
    anchor.on = !anchor.on; // toggle On/Off
    anchor.x=ev.pageX
    anchor.y=ev.pageY
    anchor.bounds = me.getBoundingClientRect();

    console.log("Target on,me,bounds=", anchor.on, me, anchor.bounds)
    ev.stopPropagation();
  }
</script>
