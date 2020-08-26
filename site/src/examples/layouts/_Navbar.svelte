<!-- 
<Panel 
  flex background="tertiary" color="white" 
  fixed top=0 left=0 w="100%" h="4" pl="1"
  elevation="nm">
 -->
<Panel 
  flex background="surface" color="body" 
  fixed top=0 left=0 w="100%" h="4" pl="1"
  elevation="nm">

  <Box no-w="160px" h="32px" shrink="no" align="middle">
    <img src="assets/avatar-treme-negativo-alt.png" height="32px"/>
  </Box>

  <Panel flex justify="start" h="36px" ml=1 grow spacing="36px">
    <Target bind:anchor={recordDefsMenu}>
      <Text nm bold>{ current.title }</Text>
      <Icon name="chevron-down" size="18px" pl=0.25/>
    </Target>
  </Panel>

  <Panel flex items="center" justify="flex-end" align="right" grow h="40px">

    <Panel flex justify="start" h="36px" w=10 mr=1 align="left">
      <Box 
        align="center" w="48px" h="34px" spacing="28px" ml=0.25 mr="-32px">
        <Icon name="magnify" size="24px"/>
      </Box>
      <Text sm pr=0.5 h="36px" spacing="34px">
        <Input 
          placeholder="Buscar ..."
          background="transparent" color="body" 
          spacing="30px" pl=2.25 pr=0.5 w="100%"
          border="3" rounded="4px"
         />
      </Text>
    </Panel>

    <Box no-h="36px" mr=1>
      <!-- The Add a record Button may have a Popover -->
      <Target bind:anchor={newMenu}>
        <Box show={false}
          elevation="xl" background="secondary++" color="white" round 
          w="35px" h="33px" 
          align="center" spacing="30px"
          >
          <Icon name="plus" size="30px"/>
        </Box>
        <Box show={true}
          elevation="nm" background="secondary++" color="white" rounded=0.25 
          no-w="38px" h="36px" 
          align="center" spacing="31px"
          pl=0.5 pr=1>
          <Icon name="plus" size="24px"/>
          <Text xs bold align="left">Nuevo</Text>
          <Icon name="chevron-down" size="12px"/>
        </Box>
      </Target>
    </Box>

    <Target bind:anchor={profileMenu}>
      <Box 
        border w="36px" no-h="36px" round align="center" mr=1>
          <Icon name="account-circle" size="36px"/>
      </Box>
    </Target>

    <Box 
      hover pointer
      on:click={() => { sosDrawer = true; }}
      center h="34px" px=0.5 spacing="32px" mr=0 
      background="gray-200" 
      borderTopLeftRadius=0.25 borderBottomLeftRadius=0.25> 
      <Text center sm nobold color="dark">SOS</Text>
    </Box>

  </Panel>

</Panel>


<Menu bind:anchor={recordDefsMenu} position="left">
    {#each $activeRecordDefs as item}
      <MenuItem 
        on:click={() => { current = item; }}
        id={item.id}
        >{item.title}</MenuItem>
    {/each}
    <MenuDivider/>
</Menu>

<Menu bind:anchor={newMenu} position="right" mt=-2.5 mr=-1>

  <MenuTitle>Agrega un nuevo registro</MenuTitle>
  
  {#each $activeRecordDefs as item}
    <MenuItem 
      on:click={(ev) => { alert(ev.detail.id) }}
      id={item.id}
      >{item.title}</MenuItem>
  {/each}

  <MenuDivider/>

  <MenuItem 
    icon="content-duplicate"
    >Copiar de ...
  </MenuItem>
</Menu>

<Menu bind:anchor={profileMenu} position="right" mt=-2.5 mr=1>
  <MenuItem icon="card-account-details-outline">Mi perfil</MenuItem>
  <MenuItem icon="star-outline">Preferencias ...</MenuItem>
  <MenuDivider />
  <MenuItem icon="location-exit">Cerrar la sesión !</MenuItem>
</Menu>

<Drawer bind:anchor={sosDrawer} position="right" w=24 p=1 pt=1.5>
  
  <Text md pb=2 w="100%">Ayuda en línea va aquí ...</Text>

  <Text nm color="body" w="100%" spacing="ample">
    Aqui debería ir la ayuda y sus textos ...
    <br>
    ...
    <br>
    ...
  </Text>
</Drawer> 

<script>
  import { Menu,MenuItem,MenuDivider,MenuTitle,Drawer } from './../../stylo/kit'
  import { Input } from './../../stylo/elements'
  import { Target, Box, Icon, Panel, Popover, Text } from './../../stylo/layout'

  import { activeRecordDefs } from './../../stores'

  let 
    newMenu, 
    profileMenu,
    recordDefsMenu,
    sosDrawer = false;

  // the currently active RecordDef
  let current = { 
      title: 'Seleccionar ...' 
  } 

</script>
