<Panel 
  flex items="center" background="transparent" color="body" 
  fixed top=4 left=0 w="100%" h="3" pl="1"
  no-elevation="sm">

  <Panel flex items="center" justify="start" h=2 grow spacing="1" overflow="hidden" mr=1>

    <Target bind:anchor={viewsMenu}>
      <Text sm bold nowrap>Últimos 7 días, Mayores a 50000 $</Text>
      <Icon name="chevron-down" size="0.75" pl=0.125/>
    </Target>
  </Panel>

  <Panel flex items="center" justify="flex-end" w=32 h=2 mr=1 align="right" grow spacing="fit">

    <Box mr=1  spacing="22px">
      <Target bind:anchor={filtersOn}>
          <Icon name="filter-variant" size="22px"/>
          <Text xs bold spacing="27px">Filtrar</Text>
          <Icon name="chevron-down" size="12px"/>
      </Target>
    </Box>

    <Box mr=1 spacing="22px">
      <Target bind:anchor={sortedOn}>
        <Icon name="sort" size="22px"/>
        <Text xs bold spacing="27px">Ordenar</Text>
        <Icon name="chevron-down" size="12px"/>
      </Target>
    </Box>

    <Box mr=1 spacing="22px">
      <Target bind:anchor={columnsOn}>
        <Icon name="table-column" size="22px"/>
        <Text xs bold spacing="27px">Ver</Text>
        <Icon name="chevron-down" size="12px"/>
      </Target>
    </Box>

    <Box mr=1 background="gray-500" color="gray-200" rounded="4px" spacing="22px" px="8px" py="1px">
      <Icon name="view-list" size="22px" color="white"/>
      <Icon name="view-column" size="14px"/>
      <Icon name="trello" size="14px"/>
      <Icon name="map" size="14px"/>
    </Box>

    <Box>
      <Target bind:anchor={moreOn}>
        <Icon name="dots-vertical" size="16px"/>
      </Target>
      <Menu bind:anchor={moreOn} position="right" w="16">
        <MenuItem id='1' icon="content-save">Guardar esta vista ...</MenuItem>
        <MenuDivider />
        <MenuItem id='2' icon="delete">Eliminar esta vista</MenuItem>
      </Menu>
    </Box>
  </Panel>
</Panel>

<Menu 
  bind:anchor={viewsMenu}
  position="left"
  >
  <MenuTitle>Tus Vistas</MenuTitle>

  {#if $activeBoardViews}
    {#each $activeBoardViews as item}

      <MenuItem 
        id={item.id}
        on:click={ () => { changedView(item); } } 
        >
        {item.title}
      </MenuItem>
    {/each}
  {/if}

  <MenuDivider/>

  <MenuItem icon="plus">Crear un nueva vista ...</MenuItem>
</Menu>

<Popover 
  bind:anchor={filtersOn}
  position="left"
  >
  <Panel font="sm" maxw=30 elevation="xxl" border="3" pt=1 rounded=0.25 p=0 background="surface">
    <Box spacing="22px" pl=1 mb=0.1>
      <Text size="13px" color="gray-500">FILTROS</Text>
    </Box>
    <Panel flex justify="start" background="white" px=1 mb=0.75 spacing="18px">
      <!-- <Icon name="--image-filter-tilt-shift" size="16px" color="gray-500"  mr=0.5/>  -->
      <Text sm align="left" spacing="ample">
        Últimos 7 días
      </Text>
    </Panel>
    <Panel flex justify="start" background="white" color="body" px=1 mb=0.75 spacing="18px">
      <!-- <Icon name="--image-filter-tilt-shift" size="16px" color="gray-500"  mr=0.5/>  -->
      <Text sm align="left" spacing="ample">
        Estado es Aprobado
      </Text>
    </Panel>
    <Panel flex justify="start" background="white" px=1 mb=0.75 spacing="18px">
      <!-- <Icon name="--image-filter-tilt-shift" size="16px" color="gray-500"  mr=0.5/>  -->
      <Text sm align="left" spacing="ample">
        Creados por Jorge M. Periz del Orte
      </Text>
    </Panel>
    <Panel flex justify="start" background="white" px=1 mb=0.75 spacing="18px">
      <!-- <Icon name="--image-filter-tilt-shift" size="16px" color="gray-500"  mr=0.5/>  -->
      <Text sm align="left" spacing="ample">
        Total &gt; 50000
      </Text>
    </Panel>
    <Panel flex justify="start" px=1 pb=1 spacing="18px">
      <Icon name="plus" size="18px" color="gray-800" align="middle" mr=0.5/>
      <Text sm bold align="left" spacing="double" color="dark">
        Agregar otro filtro
      </Text>
    </Panel>
  </Panel>
</Popover>

<Popover 
  bind:anchor={sortedOn}
  position="left"
  >
  <Panel font="sm" maxw=30 elevation="xxl" border="3" pt=1 rounded=0.25 p=0 background="surface">
    <Box spacing="22px" pl=1 mb=0.1>
      <Text size="13px" color="gray-500">ORDENAR</Text>
    </Box>
  </Panel>
</Popover>

<Popover 
  bind:anchor={columnsOn}
  position="left"
  >
  <Panel font="sm" w=30 elevation="xxl" border="3" pt=1 rounded=0.25 p=0 background="surface">
    <Box spacing="22px" pl=1 mb=0.1>
      <Text size="13px" color="gray-500">COLUMNAS</Text>
    </Box>
  </Panel>
</Popover>

<script>
  import { Menu, MenuItem, MenuDivider, MenuTitle } from './../../stylo/kit'
  import { Target, Box, Icon, Panel, Popover, Text } from './../../stylo/layout'

  import { activeBoardViews } from './../../stores'

  let
    filtersOn,
    sortedOn,
    columnsOn,
    moreOn,
    viewsMenu;

  function changedView(view) {
    console.log("Changed view=", view);
  }

</script>