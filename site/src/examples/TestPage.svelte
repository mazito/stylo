<Page bg="page" color="body" p="lg">
  <Label h2>Panels</Label>

  <br>
  <Label sm bold line="double" mt="md">A simple Panel with normal padding</Label>
  <Panel  border shadow p="nm">
    A simple Panel with normal padding and default border and shadow 
  </Panel>
  <Code>{`
    <Panel border shadow p="nm">
      A simple Panel with normal padding and default border and shadow 
    </Panel>
  `}</Code>

  <Label sm bold line="double" mt="md">A panel using the default Theme</Label>
  <Panel bg="surface" color="primary" border="3" shadow="lg" p="nm">
    A panel with background, color, border and shadow values using the <b>Theme</b>
  </Panel>
  <Code>{`
    <Panel bg="surface" color="primary" border="3" shadow="lg" p="nm">
      A panel with background, color, border and shadow values using the <b>Theme</b>
    </Panel>
  `}</Code>

  <Label sm bold line="double" mt="md">A flex panel</Label>
  <Panel flex items="center" p=0 border="3" shadow="lg" bg="surface" font-size="xs">
    <Panel p="sm" color="body" w="30ch" wired>
      Panel1 w="30ch"
    </Panel>
    <Panel grow p="sm" color="body" align="center" wired>
      Panel2 grow<br>second line<br>third line
    </Panel>
    <Panel p="sm" color="body" align="right" wired>
      Panel3<br>second line
    </Panel>
  </Panel>
  <Code>{`
    <Panel flex items="center" p=0 border="3" shadow="lg" bg="surface" font-size="xs">
      <Panel p="sm" color="body" w="30ch" wired>
        Panel1 w="30ch"
      </Panel>
      <Panel grow p="sm" color="body" align="center" wired>
        Panel2 grow<br>second line<br>third line
      </Panel>
      <Panel p="sm" color="body" align="right" wired>
        Panel3<br>second line
      </Panel>
    </Panel>
  `}</Code>

</Page>

<script>
  import { Page, Panel, Label, Theme } from '../stylo'
  import Code from './Code.svelte'
  Theme.wireframes(false)
</script>