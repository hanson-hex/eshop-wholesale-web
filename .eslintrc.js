/** .eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint-config-prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json',
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  plugins: ['vue', '@typescript-eslint'],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    ElMessage: 'readonly',
    ElMessageBox: 'readonly',
    ElLoading: 'readonly',
  },
  rules: {
    'no-console': 'off', //process.env.NODE_ENV === 'production' ? ['error', { allow: ['error', 'warn'] }] : 'off', //生产模式不允许使用log
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', //生产默认不允许使用debugger
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '.*', args: 'none' }], //变量声明未使用
    '@typescript-eslint/no-explicit-any': 'off', // 允许ts使用any
    '@typescript-eslint/no-non-null-assertion': 'off', //  禁止非空断言关闭
    'vue/multi-word-component-names': 'off', 
    'no-useless-escape': 0,
    'no-mutating-props': 0,
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/attributes-order': 'off',
  },
};
