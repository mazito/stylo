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
  class="icon mdi mdi-{name} { toClasses(props) }"
  style={ toStyles(props) }
  >
</span>

<style>
/* No additional styles needed when using Iconify */
.icon {
  display: inline-block;
  vertical-align: middle;
}
</style>

<script>
  import { toClasses, toStyles } from '../layouts/helpers'

  export let 
    name = '',
    size = 1, // rem or px or whatever ...
    spin = null,
    outlined = null,
    filled = null ;

  let 
    props = $$props;

  // set props based on 'size'
  props.h =  size ;
  props.v =  size ;
  props.spacing = size;
  props.fontSize = size;

  // if filled reduce font-size
  // so icon is seen inside frame
  // props.fontSize = filled ? 0.54*size : size ;
  // console.log("Icon", props.fontSize)
</script>
