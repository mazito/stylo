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
  <svg 
    class="icon"
    style={ icss && icss.styled(vw) }
    viewBox="0 0 24 24">
    <use 
      xlink:href={`${source}/${svgname}.svg#${prefix}${svgname}`} 
      />
  </svg>  
</span>


<style>
.icon-container {
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  padding: 0;
  margin: 0;
  fill: inherit;
  position: relative;
  no-border: 1px dotted red;

  /* fix alignment of image with text baseline /*/
  margin-bottom: -0.25em; 
}

.icon {
  box-sizing: border-box;
  display: inline-block;
  fill: inherit;
  color: inherit;
  background-color: transparent;
  padding: 0;
  margin: 0;
  line-height: 1em;
  
  /* to fix vertical centering of icn inside container */
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>

<svelte:window bind:innerWidth={vw} />

<script>
  import { Theme, Css } from '../theme';

  export let 
    name = '',
    size = null, // rem or px or whatever ...
    // spin = null,
    show = true;

  let 
    theme = Theme.active(),
    source = theme.icons.source,
    prefix = theme.icons.prefix,
    svgname = theme.icons.files[name] || '',
    vw = 0;

  // the icon-container css props
  let css = Css($$props)
            .blacklist(['font-size','color']);
  
  // the icon css props
  let icss = Css($$props)
              .synonym('size', 'font-size')
              .synonym('color', 'fill')
              .shorthand(['xs','sm','nm','md','lg','xl','h2','h1'], 'font-size')
              .whitelist(['font-size','fill'])
              
  // set default props if none defined
  icss.set('font-size', icss.get('font-size') || '1rem');
  
  // adjust icon-container props based on other received props
  css.set('height', css.get('height') || icss.get('font-size'))
      .set('width', css.get('width') || css.get('height') || icss.get('font-size'))
      .set('line-height', css.get('height') || icss.get('font-size'))
              
  // adjust icon props based on other received props
  // height is needed by SVG to correctly scale the icon
  icss.set('height', icss.get('font-size'));

  $: if (vw && $$props) {
    show = css.visible(show, vw);
    // console.log("$ Icon vw=", vw, show)
  }

  $: if ($$props['name']) {
    svgname = theme.icons.files[name] || '';
  }
</script>
