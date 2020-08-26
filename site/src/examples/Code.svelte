<Panel 
  mt="sm" p=0
  color="black" bg="gray100" 
  font-size="xs"
  line="normal"
  border="1px dashed #aaa"
  >
  <pre><code><slot></slot></code></pre>
</Panel>

<script>
  import { Panel } from '../stylo'
</script>

<style>
  pre { padding:0;margin:0;}
  code { padding:0;margin:0;}
</style>