const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  // darkMode: false, // or 'media' or 'class'
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        primary: 'var(--el-color-primary)',
        success: 'var(--el-color-success)',
        warning: 'var(--el-color-warning)',
        danger: 'var(--el-color-danger)',
        error: 'var(--el-color-error)',
        info: 'var(--el-color-success)',
        inverse: '#ffffff',
        default: 'var(--el-text-color-primary)',
        text: {
          default: 'var(--el-text-color-primary)',
          regular: 'var(--el-text-color-regular)',
          secondary: 'var(--el-text-color-secondary)',
          placeholder: 'var(--el-text-color-placeholder)',
          disabled: 'var(--el-text-color-disabled)'
        },
        border: {
          default: 'var(--el-border-color)',
          light: 'var(--el-border-color-light)',
          lighter: 'var(--el-border-color-lighter)',
          'extra-light': 'var(--el-border-color-extra-light)'
        }
      }
    }
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        '.ellipsis': {
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
          'white-space': 'nowrap'
        },
        '.ellipsis-2': {
          display: '-webkit-box',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
          'word-wrap': 'break-word',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2'
        },
        '.ellipsis-3': {
          display: '-webkit-box',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
          'word-wrap': 'break-word',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3'
        }
      })
    })
  ]
}
