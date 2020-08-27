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
  
        <Panel show={page==='#/home'}>
          <Intro></Intro>
        </Panel>
  
        <Panel show={page==='#/icon'}>
          <Icons></Icons>
        </Panel>
  
      </Box>
      
    </Panel>

  </Panel>
</Page>

<svelte:window on:hashchange={() => {
  //alert("Hola");
  changePage()
}}/>

<script>
  import { Theme, Page, Panel, Box, Label } from 'svelte-stylo'

  import Intro from './docs/Intro.md'
  import Icons from './docs/elements/icons.md'

  Theme.wireframes(false)
        .build('default')
        .active('default');

  let page = '#/icon';
  location.hash = page;

  function changePage() {
    page = location.hash;
  }
</script>
