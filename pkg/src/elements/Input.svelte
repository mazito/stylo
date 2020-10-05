{#if show}
<input
  bind:value={value}
  on:click
  on:change
  class="input { css && css.classes(vw) }"
  style={ css && css.styled(vw) }
  placeholder={placeholder}
  />
{/if}

<style>
.input {
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  border: none;
  margin: 0;
  padding: 0;
  font-size: 100%;
  font-weight: normal;
  font-style: normal;
  line-height: 1rem;
}
</style>

<svelte:window bind:innerWidth={vw} />

<script>
  import { Css } from '../theme';  
  
  export let 
    show = true,
    placeholder = '',
    value = null;
  
  let 
    vw = 0,
    css = Css($$props)
          .shorthand(['xs','sm','nm','md','lg','xl','h2', 'h1'], 'font-size');
  
  $: if (vw) {
    show = css.visible(show, vw);
  }
</script>