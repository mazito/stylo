<Panel 
  px=1 pt=0.5 pb=0 color="gray-500" spacing=1.5
  style= { toStyles(props) }
  >
  <Text bold size="xs"><slot></slot></Text>
</Panel>

<script>
  import { Panel, Text } from  './../../layout'
  import { toStyles } from  './../../layouts/helpers'

  let props = $$props;
</script>
