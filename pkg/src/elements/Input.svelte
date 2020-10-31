{#if show && type==="text"}
  <input
    id={id} type="text"
    bind:value={value}
    bind:this={me}
    on:click on:change on:focus on:blur
    class="input { css && css.classes(vw) }"
    style={ css && css.styled(vw) }
    placeholder={placeholder}
    disabled={disabled}
    />
{/if}

{#if show && type==="password"}
  <input
    id={id} type="password"
    bind:value={value}
    bind:this={me}
    on:click on:change on:focus on:blur
    class="input { css && css.classes(vw) }"
    style={ css && css.styled(vw) }
    placeholder={placeholder}
    disabled={disabled}
    />
{/if}

{#if show && type==="number"}
  <input
    id={id} type="number" pattern="[0-9]*"  inputmode="decimal" 
    step="0.01" lang="es-AR" 
    bind:value={value}
    bind:this={me}
    on:click on:change on:focus on:blur
    class="input { css && css.classes(vw) }"
    style={ css && css.styled(vw) }
    placeholder={placeholder}
    disabled={disabled}
    />
{/if}

{#if show && type==="tel"}
  <input
    id={id} type="tel" pattern="[0-9]*" inputmode="tel" 
    bind:value={value}
    bind:this={me}
    on:click on:change on:focus on:blur
    class="input { css && css.classes(vw) }"
    style={ css && css.styled(vw) }
    placeholder={placeholder}
    disabled={disabled}
    />
{/if}

<style>
.input {
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 100%;
  font-weight: normal;
  font-style: normal;
  line-height: 1rem;
  background-color: transparent;
}
</style>

<svelte:window bind:innerWidth={vw} />

<script>
  import { Css } from '../theme';  
  
  export let 
    show = true,
    type = "text",
    id = null,
    placeholder = '',
    value = null,
    disabled = false,
    bounds;

  let 
    vw = 0,
    css = null,
    me;
  
  $: if (vw && $$props) {
    css = Css($$props)
          .shorthand(['xs','sm','nm','md','lg','xl','h2', 'h1'], 'font-size');
    show = css.visible(show, vw);
  }
</script>