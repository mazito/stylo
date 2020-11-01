<!-- For text, email, integer, decimal, tel -->
{#if show && type!=='password'}
  <input
    id={id} 
    type="text" 
    class={"input "+ (css && css.classes(vw))}
    style={css && css.styled(vw)}
    on:click on:change on:input
    on:focus on:blur 
    on:keyup on:keypress on:keydown={pressed} 
    bind:value={value} 
    {...extras}
    />
{/if}

<!-- This is a very special case !-->
{#if show && type==='password'}
  <input
    id={id} 
    type="password" 
    class={"input "+ (css && css.classes(vw))}
    style={css && css.styled(vw)}
    on:click on:change on:input
    on:focus on:blur 
    on:keyup on:keypress on:keydown={pressed} 
    bind:value={value} 
    {...extras}
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

input:focus {
  outline-width: 0px;
  outline-color: transparent;
  background-color: var(--outline-background-color);
  padding-left: 4px;
}
</style>

<svelte:window bind:innerWidth={vw} />

<script>
  import { Css, Theme } from '../theme';  
  
  export let 
    show = true,
    // HTML5 attributtes
    type = "text",
    id = null,
    placeholder = '',
    value = null,
    disabled = false,
    size = null;

  let 
    vw = 0,
    css = null,
    extras = {};

  // locale for decimal point and thousands 
  const decimalPoint = ','; 
  const thousandsPoint = '.';
    
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
    'decimal': "0123456789-"+decimalPoint,
  }

  const controlkeys = [
    "Tab","Enter","Backspace",
    "ArrowLeft","ArrowRight",
    "Insert","Delete",
    "Home","End" 
  ]

  // default sizes for different input types
  const sizes = {
    'tel': 16,
    'integer': 6,
    'decimal': 8,
    'text': 20,
    'email': 20, 
    'password': 20,
    'area': 40
  };

  $: if (vw && $$props) {
    css = Css($$props)
          .shorthand(['xs','sm','nm','md','lg','xl','h2', 'h1'], 'font-size');

    show = css.visible(show, vw);

    extras = {
      pattern: patterns[type] || null, 
      inputmode: inputmodes[type] || null, 
      placeholder: placeholder,
      disabled: disabled,
      charset: charsets[type]
    }

    size = size || sizes[type];

    if (css.get("width")===null) css.set("width", size+"ch");

    // set outline background when focused
    console.log("Input outline=", css.get("--outline-background-color"));
  }

  function pressed(ev) {
    console.log("Input pressed ev,selectionStart=", ev, ev.target.selectionStart)
    if (!extras.charset) return; // no restrictions, allows all
    if (controlkeys.includes(ev.key)) return; // is control key, just ignore
    if (canInclude(ev) && extras.charset.includes(ev.key)) return;// included in charset
    ev.preventDefault(); // must stop it
  }

  function canInclude(ev) {
    // if not a numeric type, any char can be included
    if (!(["decimal","integer"].includes(type))) return true;

    // any other char can be included
    if (ev.key!==decimalPoint && ev.key!=='-') return true; 

    const s = (value || '').toString();

    // if ',' it can only be included if no other coma is present
    if (ev.key===decimalPoint && !s.includes(decimalPoint)) return true;

    // if '-' it can only be included as the first char
    const pos = ev.target.selectionStart; // get cursor position
    if (ev.key==='-' && pos===0 && !s.includes('-')) return true; 
  }

  // Future use ?

  //$: if(css && value!==null) {
    // autoResize(value);
  //}

  // function autoResize(value) {
  //   const len = (value || '').toString().length;
  //   if (len >= size) css.set("width", (len+1)+"ch")
  //   console.log("Input len, width=", len, css.get("width"));
  // }
</script>
