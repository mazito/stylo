<Panel 
  on:click={ handleSelected }
  flex items="center" justify="start"
  maxw=17 pl=1 py=1 hover color="body" id={id} spacing=1
  overflow="hidden"
  pointer
  >
  {#if icon}
    <Icon name={icon} size=1.5 pr=1/>
  {/if}

  {#if !contentSlot}
    <Text sm pr=1 nowrap>
      <slot></slot>
    </Text>
  {/if}

  {#if contentSlot}
    <slot name="content"></slot>
  {/if}
</Panel>

<script>
  /*
    Use cases:

      <MenuItem>This is a text only menu item</MenuItem>

      <MenuItem icon="plus">This has text and a leading icon</MenuItem>

      <MenuItem>
        <div slot="content">
          This can have any content ...
        </div>
      </MenuItem>
  */ 
  import { Panel, Box, Icon, Text } from  './../../layout'
  import { createEventDispatcher } from 'svelte';
  import { activePop } from './../../layouts/Popover.svelte'

  const emit = createEventDispatcher();
  
  export 
    let icon = null,
    id = null;

  let props = $$props;
  let contentSlot = props.$$slots && !!props.$$slots['content'];

  function handleSelected(ev) {
    activePop.set(-1); // force closing the Menu !
    ev.stopPropagation();
    emit('click', { id: id });
  }

</script>
