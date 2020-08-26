
<Popover 
  bind:anchor={anchor}
  position={position}
  >
  <Panel 
    maxw=17 py=0
    elevation="xxl" border="3" rounded=0.25 
    background="surface"
    { ...props }
    >
    <slot></slot>
  </Panel>
</Popover>

<script>
  /*
  */ 
  import { Panel, Popover } from  './../../layout'
  import { randid } from  './../../layouts/helpers'

  export let 
    anchor, // don't initialize this, it will be set by Target
    position = 'left'; // or 'right'

  export let
    // FIX: es necesario que cada menu tenga un ID propio 
    // para que no genere conflictos con otros menues cuando 
    // las props 'anchor' y 'position' son exactamente iguales 
    // en mas de un menu. Aparentemente Svelte se confunde !!!
    id = randid(); 

  console.log("Menu", id, anchor, position)

  let props = $$props;
</script>
