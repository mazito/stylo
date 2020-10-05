{#if show}
<select
  id={id || ''}
  class="selector { css.classes() }"
  style={ css.styled() }>

  {#if options && options.length}
    {#each options as opt}
      {#if opt.value === value}
        <option selected value={opt.value}>{opt.text}</option>
      {:else}
        <option value={opt.value}>{opt.text}</option>
      {/if}
    {/each}
  {/if}

  {#if !options}<slot></slot>{/if}

</select>
{/if}

<style>
.selector {
  display: inline-block;
  box-sizing: border-box;
  background-color: transparent;
  margin: 0;
  padding: 0;
  font-size: 100%;
  font-weight: normal;
  font-style: normal;
  line-height: 1em;
}
</style>

<svelte:window bind:innerWidth={vw} />

<script>
  import { Css } from '../theme';

  export let
    value,
    options = null, 
    id = null; // the ControlId 

  let 
    vw = 0,
    show = true,
    css = Css($$props)
      .shorthand(['xs','sm','nm','md','lg','xl','h2', 'h1'], 'font-size')

  $: if (vw) {
    show = css.visible(show, vw);
  }
</script>