{#if show}
<Overlay 
  on:click
  modal={modal}
  bind:show={show}
  >
  <Panel flex="column" items="center" h="100vh">
    <Panel shrink h="100%" wired></Panel>
    <Panel grow shrink h="100%" ml="auto" mr="auto" wired>
      <slot></slot>
    </Panel>
    <Panel shrink h="100%" wired></Panel>
  </Panel>
</Overlay>
{/if}

<script>
  import Overlay from './Overlay.svelte'
  import Panel from './Panel.svelte'

  export let
    modal = false,
    show = false;
</script>