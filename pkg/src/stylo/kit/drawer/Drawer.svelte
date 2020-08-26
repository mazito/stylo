<Overlay bind:show={anchor}>
  {#if !!position && position=='right'}
    <Panel 
      background="surface"
      elevation="md"
      fixed right=0 top=0 bottom=0 
      { ...props }
      >
      <slot></slot>
    </Panel>
  {/if}
  {#if !!position && position=='left'}
    <Panel 
      background="surface"
      elevation="md"
      fixed left=0 top=0 bottom=0 
      { ...props }
      >
      <slot></slot>
    </Panel>
  {/if}

  <!-- <Box 
    on:click={()=> { anchor=false; }}
    color="body"
    absolute right=0.5 top=1>
    <Icon name="close" size=2/>
  </Box> -->
  <IconButton 
      name="close" size=2.0
      on:click={()=> { anchor=false; }}
      color="body"
      round
      absolute right=0.5 top=1/>

</Overlay>

<script>
  import { Overlay, Panel } from './../../layout'
  import { IconButton } from './../../kit'

  export let
    anchor,
    modal = false,
    position = null ;

  let props = $$props;
</script>