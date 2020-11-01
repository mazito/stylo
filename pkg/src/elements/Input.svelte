{#if show}
  <input
    id={id}
    type="text" 
    bind:value={value} 
    on:click 
    on:change 
    on:focus 
    on:blur
    on:keydown={pressed}
    {...props}
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
    size = 10;

  let 
    vw = 0,
    css = null,
    props = {};
  
  const patterns = {
    'tel': "[0-9]*",
    'integer': "[0-9]*",
    'decimal': "[0-9]*",
  }

  const inputmodes = {
    'tel': "tel",
    'integer': "numeric",
    'decimal': "decimal",
  }

  const charsets = {
    'tel': "0123456789-",
    'integer': "0123456789-",
    'decimal': "0123456789-,",
  }

  const controlkeys = [
    "Tab","Enter","Backspace",
    "ArrowLeft","ArrowRight",
    "Insert","Delete",
    "Home","End" 
  ]

  $: if (vw && $$props) {
    css = Css($$props)
          .shorthand(['xs','sm','nm','md','lg','xl','h2', 'h1'], 'font-size');

    show = css.visible(show, vw);

    props = {
      pattern: patterns[type] || null, 
      inputmode: inputmodes[type] || null, 
      class: "input "+ (css && css.classes(vw)),
      style: css && css.styled(vw),
      placeholder: placeholder,
      disabled: disabled,
      charset: charsets[type]
    }

    let w = css.get("width");
    if (w===null) css.set("width", size+"ch");
  }

  $: if(css && value !== null) {
    // autoResize(value);
  }

  function autoResize(value) {
    const len = (value || '').toString().length;
    if (len >= size) css.set("width", (len+1)+"ch")
    console.log("Input len, width=", len, css.get("width"));
  }

  function pressed(ev) {
    if (!props.charset) return; // no restrictions, allows all
    if (controlkeys.includes(ev.key)) return; // is control key, just ignore
    if (noRepeats(ev.key) && props.charset.includes(ev.key)) return;// included in charset
    ev.preventDefault(); // must stop it
  }

  function noRepeats(c) {
    if (!(["decimal","integer"].includes(type))) return true;
    const s = (value || '').toString();
    const no_dash = (c!=='-') || (c==='-' && s.length==0); // only as first char
    const no_coma = (c!==',') || (c===',' && !s.includes(',')); // no coma present 
    return (no_dash && no_coma)
  }
</script>
