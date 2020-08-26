<input
  bind:value={value}
  on:click
  on:change
  class="input { toClasses(props) }"
  style={ toStyles(props) }
  placeholder={placeholder}
  />

<style>
.input {
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  border: none;
  margin: 0;
  padding: 0;
  font-size: 100%;
  font-weight: normal;
  font-style: normal;
  line-height: 1rem;
}
</style>

<script>
  import { toClasses, toStyles, shorthand } from './../../layouts/helpers'

  export let
    placeholder = '',
    value = null;

  let 
    props = $$props ;
</script>