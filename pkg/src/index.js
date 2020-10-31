import Box from './layouts/Box.svelte'
import Overlay from './layouts/Overlay.svelte'
import Page from './layouts/Page.svelte'
import Panel from './layouts/Panel.svelte'
import Popover from './layouts/Popover.svelte'
import { activePop } from './layouts/Popover.svelte'
import Trigger from './layouts/Trigger.svelte'
import Button from './elements/Button.svelte'
import Heading from './elements/Heading.svelte'
import Icon from './elements/Icon.svelte'
import Input from './elements/Input.svelte'
import Textarea from './elements/Textarea.svelte'
import Label from './elements/Label.svelte'
import Select from './elements/Select.svelte'
import Text from './elements/Text.svelte'
import Theme from './theme/theme'
import { Css } from './theme/css'
import { onBreakpoint } from './theme/domains'

export {
  // Layouts
  Page, 
  Panel,
  Box,
  Overlay,
  Popover,
  activePop,
  Trigger,
  
  // Elements 
  Button,
  Icon,
  Input,
  Textarea,
  Select,
  Label,
  Text,
  Heading,

  // API
  Theme,
  Css,
  onBreakpoint
}

/*
import Target from './layouts/Target.svelte'
import Box from './layouts/Box.svelte'
import Icon from './layouts/Icon.svelte'
import Page from './layouts/Page.svelte'
import Panel from './layouts/Panel.svelte'
import Overlay from './layouts/Overlay.svelte'
import Popover from './layouts/Popover.svelte'
import Text from './layouts/Text.svelte'
import Theme from './layouts/theme'

import Menu from './kit/menu/Menu.svelte'
import MenuItem from './kit/menu/MenuItem.svelte'
import MenuDivider from './kit/menu/MenuDivider.svelte'
import MenuTitle from './kit/menu/MenuTitle.svelte'

export {
  // Layout components
  Target,
  Box,
  Icon,
  Overlay,
  Page, 
  Panel,
  Popover,
  Text,
  Theme,

  // Kit components
  Menu, MenuItem, MenuDivider, MenuTitle,
}
*/