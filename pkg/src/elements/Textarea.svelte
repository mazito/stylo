{#if show}
  <textarea
    id={id}
    bind:value={value}
    bind:this={me}
    use:autoResize
    on:click
    on:change
    on:focus
    on:blur
    class="textarea {underlined ? 'underlined' : ''} { css && css.classes(vw) }"
    style={ css && css.styled(vw) }
    placeholder={placeholder}
    disabled={disabled}
    rows="1"
    ></textarea>
{/if}

<style>
.textarea {
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

.underlined {
  background-color: transparent;
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgaWQ9IlNWR1Jvb3QiCiAgIHZlcnNpb249IjEuMSIKICAgdmlld0JveD0iMCAwIDEgMjQiCiAgIGhlaWdodD0iMjQiCiAgIHdpZHRoPSIxIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzMjAzOSIgLz4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGEyMDQyIj4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZT48L2RjOnRpdGxlPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzp0aXRsZSAvPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZwogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsOCkiCiAgICAgaWQ9ImxheWVyMSIKICAgICBzdHlsZT0iZmlsbDojZmY3ZjJhO2ZpbGwtb3BhY2l0eToxIj4KICAgIDxyZWN0CiAgICAgICB5PSIxNSIKICAgICAgIHg9IjAiCiAgICAgICBoZWlnaHQ9IjEiCiAgICAgICB3aWR0aD0iMSIKICAgICAgIGlkPSJyZWN0MjU5NSIKICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojZmY3ZjJhO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDowLjM5Mzg5Mjc5O3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiIC8+CiAgPC9nPgo8L3N2Zz4K");
  line-height: 24px !important;
}
</style>

<svelte:window bind:innerWidth={vw} />

<script>
  import { Css } from '../theme';  
  
  export let 
    id = null,
    show = true,
    placeholder = '',
    value = null,
    underlined = false,
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
    bounds = me.getBoundingClientRect()
    console.log("Textarea bounds.w", me, bounds.width)
  }

  /**
   * Autoresize functions
   */
  function resize({ target }) {
    target.style.height = "1px";
    target.style.height = (+target.scrollHeight)+"px";	
  }
    
  function autoResize(el) {
    resize({ target: el });
    el.style.overflow = 'hidden';
    el.addEventListener('input', resize);
    
    return {
      destroy: () => el.removeEventListener('input', resize)
    }
  }  
</script>