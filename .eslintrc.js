// TODO: NÃO ALTERAR ESSE ARQUIVO, TODOS OS ERROS MENOS RELEVANTES JÁ ESTÃO DESATIVADOS,
// TODO: SE O ESLINT ESTÁ LOGANDO MUITOS ERROS, SUA IDE NÃO ESTÁ DEVIDAMENTE CONFIGURADA.
// TODO: TUTORIAL PARA CONFIG:
// TODO: WebStorm: https://www.jetbrains.com/help/webstorm/eslint.html#ws_js_eslint_activate
// TODO: VSCode: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
// TODO: Artigo Adicional: https://medium.com/@erickwendel/code-stantards-padronizando-sua-equipe-de-desenvolvimento-e1e47e3edf11
// TODO: Att. Thiago Fernandes Telles
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'eslint-disable-next-line': 'off',
    semi: ['error', 'never'],
    'max-len': 'off',
    'linebreak-style': 'off',
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true, ignoreImports: true }],
    'arrow-parens': ['error', 'as-needed'],
    'vue/multiline-html-element-content-newline': 'off',
    'object-curly-newline': 'off',
    'import/extensions': 'off',
    'eol-last': 'off',
    'no-trailing-spaces': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
}
