<!--
@component

This is the basic Popover building block
on which other Popovers can be build.

Notes: ideally should not use any styling, as it simply is
a container for whatever you will be putting inside it. 

All styling must be done in the contained elements.

API:

  show = false,
  anchor = null,
  w = "18", 
  x = 0, 
  y = 0,
  position = "right"  
-->    
<div 
  id={id}
  on:click={(ev) => ev.stopPropagation()}
  >
  {#if !!anchor && anchor.on && $activePop===id}
    <div 
      bind:clientWidth={cw} 
      bind:clientHeight={ch}    
      class="popover { wireframe ? ' wireframe' : '' }"
      style="{ css && css.styled(vw) };{ located }" 
      >
      <slot></slot>
    </div>
  {/if}
</div>


<style>
.popover {
  display: block;
  position: fixed;
  z-index: 100 !important;
}
</style>

<svelte:window bind:innerWidth={vw} on:click={() => { 
  console.log("outside");
  //show=false; 
  if (anchor) anchor.on=false; 
}}/>

<script context="module">
  import { writable } from 'svelte/store'

  export const activePop = writable(null);

  activePop.set(null);

  console.log("Active Pop")
</script>


<script>
  import { onMount } from 'svelte'
  import { Css, Theme } from '../theme'

  export let
    show = false,
    anchor = null,
    x = null, y = null,
    position = "right";  // aligns right popover with right anchor 

  let
    //selfie = null,
    id = randid(),
    located,
    cw, ch, // client width and height
    wireframe = Theme.wireframes(),
    vw = 0,
    yy, xx,
    css = Css($$props);

  // create anchor if it does not exist
  // assigning it the show value
  if (!anchor && !!show)
    anchor = { on: show };

  $: if (anchor && !!anchor.on) {

      console.log("$ Popover changed", id, anchor.on, cw)

      // get Window container rect for limiting Pop position
      let body = document.getElementsByTagName('body')[0]
      let ww = body.clientWidth;

      if (anchor) {
        xx = x 
              // if we received an X position me must use it
              ? x 
              // if not X then must calculate
              // the position relative to this anchor
              : (position === 'right' 
                ? anchor.bounds.right - cw 
                : anchor.bounds.left) ;

        yy = y
              // if we received an Y position me must use it
              ? y
              // if not Y then must calculate
              // the position relative to this anchor
              : anchor.bounds.bottom ;

        console.log("$ Popover y,bounds.bottom=", y, anchor.bounds.bottom)

        // reposition correctly if 
        // out of the screen borders
        if (xx+cw >= ww) xx = ww - cw - 1;
        if (xx <= 0) xx = 1;
      }

      // set the 'location' BEFORE putting it visible
      located = 'left:'+xx+'px;'+'top:'+yy+'px;'

      // show = anchor.on; // now we can activate it !

      // and informe the other pops that 
      // we are now the only active one !
      activePop.set(id) ;

      console.log("$ Popover active", id, anchor.on, xx, yy)
  }

  activePop.subscribe((t) => {
    // if it's not my ID this means that some 
    // other pop is now active and so we must go !
    if (t && t !== id && anchor && !!anchor.on) {
       //show = false;
       anchor.on = false ; 
    }
  })

  function randid() {
    /** 
     * Returns a randomized ID of the form 'idXXXX'
     * where X is a Hexa digit (0..F) 
     */
    function randint(min, max) {
      return parseInt(min + Math.floor((max - min) * Math.random()))
    }
    return 'id'+(randint(0, 65535).toString(16))
  }
</script>
