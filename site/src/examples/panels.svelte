<Overlay 
  bind:show={show} centered>
  <Panel
    bg="surface" color="black"
    border shadow="lg" rounded="sm"
    p="lg" pb="md"
    maxw=30 line="double">
    A Panel with background, color, border, shadow, radii, 
    padding and margin using default Theme values.
    <br>
    <Box color="body">
      Click outside of this Panel for closing, or 
      <Button
        nm hover
        bg="surface" color="primary"
        on:click={() => {show=false;}}
        >Click me !
      </Button>
    </Box>
  </Panel>
</Overlay>

<script>
  import { Panel, Box, Overlay, Button } from 'svelte-stylo'
  export 
    let show = false;
</script>
