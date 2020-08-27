<!--
  Icons using the Iconify site:

  https://iconify.design/

  The set is Material Design Icons (mdi)

  Example:

    <span 
      class="iconify" 
      data-icon="mdi:account-circle-outline" 
      data-inline="false">
    </span>
-->
<span 
  class="icon-container { css && css.classes(vw) }"
  style={ css && css.styled(vw) }
  >
  <span 
    class="icon mdi mdi-{name}"
    style={ icss && icss.styled(vw) }
    >
  </span>
</span>

<style>
/* No additional styles needed when using Iconify */
.icon-container {
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  padding: 0;
  margin: 0;
  /* no-vertical-align: middle;*/
}
.icon {
  box-sizing: border-box;
  display: inline-block;
  color: inherit;
  background-color: transparent;
  padding: 0;
  margin: 0;
  line-height: 1em;
  vertical-align: middle;
  margin-top: -0.125em; /* to fix incorrect vertical centering */
}
</style>

<svelte:window bind:innerWidth={vw} />

<script>
  import { Css } from '../theme';
  
  export let 
    name = '',
    size = null, // rem or px or whatever ...
    spin = null,
    outlined = null,
    filled = null,
    show = true;

  let vw = 0;

  let css = Css($$props)
      .blacklist(['font-size']);
  
  let icss = Css($$props)
      .synonym('size', 'font-size')
      .shorthand(['xs','sm','nm','md','lg','xl','h2','h1'], 'font-size')
      .whitelist(['font-size']);

  console.log("Icon 1:", css.props(), icss.props())

  css.set('height', css.get('height') || icss.get('font-size'))
  css.set('width', css.get('width') || css.get('height') || icss.get('font-size'))
  css.set('line-height', css.get('height') || icss.get('font-size'))

  console.log("Icon 2:", css.props(), icss.props())
    
  $: if (vw && $$props) {
    show = css.visible(show, vw);
    // console.log("$ Panel vw=", vw, show)
  }
</script>
