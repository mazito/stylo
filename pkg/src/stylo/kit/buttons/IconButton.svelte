<Box 
  on:click
  class="icon-button"
  { ...props }
  >
  <Icon hover name={name} size={size} spacing={size}/>
</Box>

<script>
  import { toClasses, toStyles } from './../../layouts/helpers'
  import { Box, Icon } from './../../layout'
import App from '../../../App.svelte';
import BoardPage from '../../../pages/board/BoardPage.svelte';

  export let
    name = null,
    size = null;

  let props = $$props;

  let isize = 0.75*size;
</script>
