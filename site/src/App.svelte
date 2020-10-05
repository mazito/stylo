<Page>

  <Panel 
    flex={{'*': "column", md: "row"}}
    justify="start" items="start"
    >

    <Panel
      w={{'*': "100%", md: '25vw'}}
      mt={{'*': "0", md: 'sm'}}
      ml={{'*': "md", md: "md"}}
      pl={{'*': "nm", md: 0}}
      align={{'*': "left", md: "right"}}
      border-right={{'*': "0", md: "3"}}
      border-left={{'*': "3", md: 0}}
      mr="sm" pr="sm" pt="nm" pb="nm"
      color="link"
      line="double"
      >
      
      <Box  align="left" w={{'*': "100%", md: '14rem'}}>

        <Box>
          <Label h1 thin color="black"><a href="#/home">Stylo</a></Label>
        </Box>

        <Panel pb="nm">
          <Label xs color="muted" py="sm">INTRO AND CONCEPTS</Label>
          <br>
          <a href="#">Components first</a>
          <br>
          <a href="#">Responsive and reactive</a>
          <br>
          <a href="#">Themable but flexible</a>
          <br>
          <a href="#">Building blocks</a>
          <br>
          <a href="#">Credits</a>
        </Panel>
      
        <Panel pb="nm">
          <Label xs color="muted" py="sm">LAYOUT</Label>
          <br>
          <a href="#">Page</a>
          <br>
          <a href="#">Panel</a>
          <br>
          <a href="#">Box</a>
          <br>
          <a href="#">Overlay</a>
          <br>
          <a href="#">Popover</a>
          <br>
          <a href="#">Trigger</a>
        </Panel>
        
        <Panel pb="nm">
          <Label xs color="muted" py="sm">ELEMENTS</Label>
          <br>
          <a href="#">Button</a>
          <br>
          <a href="#">Check</a>
          <br>
          <a href="#/icon">Icon</a>
          <br>
          <a href="#">Input</a>
          <br>
          <a href="#">Label</a>
          <br>
          <a href="#">Radio</a>
          <br>
          <a href="#">Select</a>
          <br>
          <a href="#">Text</a>
        </Panel>

        <Panel pb="nm">
          <Label xs color="muted" py="sm">THEMING</Label>
          <br>
          <a href="#">Theme specification</a>
          <br>
          <a href="#">Theme-aware properties</a>
          <br>
          <a href="#">Customization</a>
        </Panel>

        <Panel pb="nm">
          <Label xs color="muted" py="sm">CORE API</Label>
          <br>
          <a href="#">Usage</a>
          <br>
          <a href="#">Theme API</a>
          <br>
          <a href="#">Css API</a>
          <br>
        </Panel>
      </Box>
    </Panel>  
  
    <Panel>

      <Box 
        line="ample" font-size="nm" color="body"
        markdown 
        maxw={{'*': "100%", md: "80ch"}}
        pl="nm" pr="nm" align="left"
        >
  
        <Panel show={current===null} align="center" m="xl">
          <Label xl>
            Not reaaaady yet ... please wait me !
          </Label>
        </Panel>

        <Panel show={page}>
          <svelte:component this={Any[page]}/>
        </Panel>

      </Box>
      
    </Panel>

  </Panel>
</Page>

<svelte:window on:hashchange={() => {changePage();}}/>

<script>
  import { Theme, Page, Panel, Box, Label } from 'svelte-stylo'

  /**
   * Theming and settings
   */ 
  let theme = Theme.get('default');

  theme.icons = {
    source: 'assets/@mdi/svg',
    prefix: 'mdi-',
    files: {
      'close': 'close',
    }
  }

  Theme.wireframes(false)
        .build('default')
        .active('default');

  /**
   * Routing page changes and dynamic import of modules
   */
  let 
    page = null,
    params = null,
    current = null ;
    
  function route(page) {
    if (page === '#/home') return import('./docs/intro.md');
    if (page === '#/icon') return import('./docs/elements/icons.md');
    return null;
  }

  let Any = {}; // cached components go here

  // set empty hash so hashchange can detect changes
  location.hash = "#"

  // wait some time before setting 'home'
  setTimeout(() => {
    location.hash = '#/home';
  }, 500);
 
  function changePage() {
    // respond to the 'hashchange' event and
    // extract page and params from location url
    const parts = location.hash.split('?')
    page = parts[0];
    params = parts.length > 1 ? parts[1].split('&') : [];
  }
  
  $: if (page && page !== current) {
    console.log("$ page=", page)
    const routed = route(page) ;
    if (routed && !Any[page]) routed.then(module => {
      Any[page] = module.default;
      console.log("$ Loaded route=", routed)
      current = page ;
    })
  }  
</script>
