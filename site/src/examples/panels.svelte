<Overlay 
  bind:show={show} 
  centered>
  <Panel
    bg="surface" 
    color="secondary++"
    border 
    shadow="lg"
    rounded="sm"
    line="ample"
    px="nm" pt="md" pb="sm"
    >
    A panel with background, color, border, shadow, radii, padding
    and margin using default Theme values.
    <br>
    <Button
      sm px="nm" py="sm" mt="nm" hover
      on:click={() => {show=false;}}
      >Close me !
    </Button>
  </Panel>
</Overlay>

<script>
  import { Panel, Overlay, Button } from 'svelte-stylo'

  export let show = false;
</script>
