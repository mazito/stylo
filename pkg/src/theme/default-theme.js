export const DefaultTheme = {

  fontFamilies: { 
    "default": '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    "roboto": '"Roboto", sans-serif',
    "nunito": '"Nunito", sans-serif'
  },

  fontSizes: {
    xs: '12px', // caption 
    sm: '14px', // body 2
    nm: '16px', // body 1
    md: '18px', // 
    lg: '20px', // h4
    xl: '24px', // h3 = 1.5rem
    h3: '28px', // h3 = 1.75rem
    h2: '32px', // h2 = 2rem
    h1: '36px', // h1 = 2.25rem
  },

  fontWeights: {
    'thin': '300',
    'normal': '400',
    'bold': '700'
  },

  fontStyles: {
    'italic': 'italic',
    'underline': 'underline'
  },

  lineHeights: {
    'crushed': '0.875em',
    'fit': '1em',
    'tight': '1.25em',
    'normal': '1.5em',
    'ample': '1.625em',
    'double': '2em'
  },

  colors: {
    // base colors
    primary: "#ef4801", //#C62828", // #e04b00, #f5715b,
    tertiary: '#2f2f4f',
    white: '#fff',
    black: '#000',

    // secondary color and variants
    secondary: {
      '': '#28e997',
      '--': '#28e997',
      '-': '#28e997',
      '+': 'hsl(155, 81%, 50%)',
      '++': 'hsl(155, 81%, 40%)',
      '+++': 'hsl(155, 81%, 32%)',
    },

    // back colors
    page: '#f5f5f6',//'#fcfefc',
    surface: '#fff',

    // text colors (on surface)
    body: '#6a6a7f',
    muted: '#9a9aba',
    link: '#009688',

    // emotional colors
    danger: '#ff0000',
    warning: 'orange',
    success: 'green',
    info: '#34dcf3',
    'info++': 'blue',
    light: '#f4f8fc',
    dark: '#212141',

    // full palette
    gray: {
      100: '#f7fafc',
      200: '#edf2f7',
      300: '#e2e8f0',
      400: '#cbd5e0',
      500: '#a0aec0',
      600: '#718096',
      700: '#4a5568',
      800: '#2d3748',
      900: '#1a202c',
    },
    red: {
      100: '#fff5f5',
      200: '#fed7d7',
      300: '#feb2b2',
      400: '#fc8181',
      500: '#f56565',
      600: '#e53e3e',
      700: '#c53030',
      800: '#9b2c2c',
      900: '#742a2a',
    },
    orange: {
      100: '#fffaf0',
      200: '#feebc8',
      300: '#fbd38d',
      400: '#f6ad55',
      500: '#ed8936',
      600: '#dd6b20',
      700: '#c05621',
      800: '#9c4221',
      900: '#7b341e',
    },
    yellow: {
      100: '#fffff0',
      200: '#fefcbf',
      300: '#faf089',
      400: '#f6e05e',
      500: '#ecc94b',
      600: '#d69e2e',
      700: '#b7791f',
      800: '#975a16',
      900: '#744210',
    },
    green: {
      100: '#f0fff4',
      200: '#c6f6d5',
      300: '#9ae6b4',
      400: '#68d391',
      500: '#48bb78',
      600: '#38a169',
      700: '#2f855a',
      800: '#276749',
      900: '#22543d',
    },
    teal: {
      100: '#e6fffa',
      200: '#b2f5ea',
      300: '#81e6d9',
      400: '#4fd1c5',
      500: '#38b2ac',
      600: '#319795',
      700: '#2c7a7b',
      800: '#285e61',
      900: '#234e52',
    },
    blue: {
      100: '#ebf8ff',
      200: '#bee3f8',
      300: '#90cdf4',
      400: '#63b3ed',
      500: '#4299e1',
      600: '#3182ce',
      700: '#2b6cb0',
      800: '#2c5282',
      900: '#2a4365',
    },
    indigo: {
      100: '#ebf4ff',
      200: '#c3dafe',
      300: '#a3bffa',
      400: '#7f9cf5',
      500: '#667eea',
      600: '#5a67d8',
      700: '#4c51bf',
      800: '#434190',
      900: '#3c366b',
    },
    purple: {
      100: '#faf5ff',
      200: '#e9d8fd',
      300: '#d6bcfa',
      400: '#b794f4',
      500: '#9f7aea',
      600: '#805ad5',
      700: '#6b46c1',
      800: '#553c9a',
      900: '#44337a',
    },
    pink: {
      100: '#fff5f7',
      200: '#fed7e2',
      300: '#fbb6ce',
      400: '#f687b3',
      500: '#ed64a6',
      600: '#d53f8c',
      700: '#b83280',
      800: '#97266d',
      900: '#702459',
    },
  },

  shadows: {
    'shadow': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    'xs': '0 0 0 1px rgba(0, 0, 0, 0.05)',
    'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'nm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    'xxl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },

  borders: {
    'border': '1px solid #eef',
    'wired': '1px dashed red',
    '0': '1px solid #fff',
    '1': '1px solid #eef',
    '2': '1px solid #dde',
    '3': '1px solid #ccd',
    '4': '1px solid #bbc',
    '5': '1px solid #aab',
    '6': '1px solid #888',
  },

  radii: {
    'xs': '0.25rem',
    'sm': '0.5rem',
    'nm': '1rem',
    'md': '1.5rem',
    'lg': '2rem',
    'xl': '3rem',
    'round': '100%'
  },

  spacing: {
    'xs': '0.25rem',
    'sm': '0.5rem',
    'nm': '1rem',
    'md': '1.5rem',
    'lg': '2rem',
    'xl': '3rem',
    'auto': 'auto'
  },

  sizing: {
    'auto': 'auto'
  },

  iconSizes: {
    xs: '0.6rem',
    sm: '0.8rem',
    nm: '1rem',
    md: '2rem',
    lg: '2.5rem',
    xl: '3rem',
    xxl: '4rem',
  },

  icons: {
    prefix: 'mdi-',
    source: 'assets/@mdi/svg',
    files: {
      'close': 'close',
      'network': 'access-point-network',
    }  
  },

  breakpoints: {
    // uses min.width as breakpoint
    // 'xs' is '*' between 0 and 360
    'sm': 480,  // > 22.5rem => Phone
    'md': 760,  // > 48 rem => Tablet 
    'lg': 1020, // > 64 rem => Laptop
    'xl': 1280, // > 80rem => Desktop
  },
  
  // Extra domains added to Theme to validate 
  // other constrains but that are not themables

  scrolling: {
    'hidden': 'hidden',
    'auto': 'auto'
  },

  positioning: {
    'fixed': 'fixed',
    'absolute': 'absolute',
    'relative': 'relative'
  },

  wraps: {
    'nowrap': 'nowrap'
  },

  cursors: {
    'pointer': 'pointer'
  },

  horizontalAligns: {
    'left': 'left',
    'center': 'center',
    'right': 'right',
    'justify': 'justify'
  },

  verticalAligns: {
    'top': 'top',
    'bottom': 'bottom',
    'middle': 'middle',
    'baseline': 'baseline'
  },

  flexDirections: {
    'flex': 'row', // the default
    'row': 'row',
    'column': 'column'
  },

  flexJustifyContents: {
    'start': 'flex-start',
    'end': 'flex-end',
    'center': 'center',
    'between': 'space-between',
    'around': 'space-around',
    'evenly': 'space-evenly'
  },

  flexAlignItems: {
    'start': 'flex-start',
    'end': 'flex-end',
    'center': 'center',
    'baseline': 'baseline',
    'stretch': 'stretch',  
  },

  flexGrows: {
    'grow': '1',
    'no': '0'
  },

  flexShrinks: {
    'shrink': '1',
    'no': '0'
  },

  booleans: {
    true: true,
    false: false
  }
}
