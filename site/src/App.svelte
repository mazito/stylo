<Page>

  <Panel 
    font-size="h1"
    ml={{'*': "xs", md: '25vw'}}
    p="nm"
    >Stylo</Panel>

  <Panel 
    flex={{'*': "column", md: "row"}}
    justify="start" items="start"
    >

    <Panel
      w={{'*': "100%", md: '25vw'}}
      mt={{'*': "0", md: 'sm'}}
      ml={{'*': "md", md: 0}}
      pl={{'*': "nm", md: 0}}
      align={{'*': "left", md: "right"}}
      border-right={{'*': "0", md: "3"}}
      border-left={{'*': "3", md: 0}}
      mr="sm" pr="nm" pt="nm" pb="nm"
      color="link"
      >
      <Panel p="sm"><a href="#">Intro</a></Panel>
      <Panel p="sm"><a href="#">Layout components</a></Panel>
      <Panel p="sm"><a href="#">Element components</a></Panel>
      <Panel p="sm"><a href="#">CSS properties</a></Panel>
      <Panel p="sm"><a href="#">Theming</a></Panel>
      <Panel p="sm"><a href="#">Api and functions</a></Panel>
    </Panel>  
  
    <Box 
      line="ample" font-size="nm" color="body"
      markdown 
      maxw={{'*': "100%", md: "80ch"}}
      pl="nm" pr="nm" align="left"
      >
      <Intro></Intro>
    </Box>

  </Panel>
</Page>

<script>
  import Intro from 'docs/intro.md'

  import { Theme, Page, Panel, Box, Label } from './stylo'

  Theme.wireframes(false)
        .build('default')
        .active('default');

</script>
