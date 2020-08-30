{#if show}
  <div
    on:click
    class="heading { css && css.classes() }"
    style={ css && css.styled() }>
    <slot></slot>
  </div>
{/if}

<style>
.heading {
  display: block;
  box-sizing: border-box;
  font-size: 100%;
  font-weight: normal;
  font-style: normal;
  line-height: 1em;
  word-wrap: normal;
  white-space: nowrap;
  margin: 0; 
  padding: 0;
}
</style>

<svelte:window bind:innerWidth={vw} />

<script>
  import { Css } from '../theme';  
  
  export let 
    show = true;
  
  let 
    vw = 0,
    css = Css($$props)
      .shorthand(['xs','sm','nm','md','lg','xl','h2','h1'], 'font-size')
      .shorthand(['normal','bold','thin'], 'font-weight')
      .shorthand(['center','left','right','justify'], 'text-align')
      .shorthand(['nowrap'], 'white-space')
  
  $: if (vw) {
    show = css.visible(show);
  }
</script>