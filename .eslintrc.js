module.exports = {
  // 定义ESLint解析器
  parser: '@typescript-eslint/parser',
  // extends 中 plugin:prettier/recommended 是处理eslint和prettier冲突的请确保其在最后一位
  extends: ['prettier', 'plugin:prettier/recommended'],
  plugins: ['react', 'import', '@typescript-eslint', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // eslint中禁止增加格式化规则 请在.prettierrc中添加
  rules: {
    // 将prettier格式问题以eslint错误报出
    'prettier/prettier': 'error',
    // 严格模式
    strict: ['error', 'never'],
    'react/display-name': 0,
    // 禁止 <App {...props} /> 中的这种{...props}传播
    'react/jsx-props-no-spreading': 0,
    // 强制状态初始化样式
    'react/state-in-constructor': 0,
    // 强制 React 组件静态属性应该放置在哪里
    'react/static-property-placement': 0,
    // 强制使用解构赋值 Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',
    // 限制可能包含 JSX 的文件扩展名
    'react/jsx-filename-extension': 'off',
    // 数组渲染需要设置key属性
    'react/no-array-index-key': 'warn',
    // 检查 Hooks 的使用规则
    'react-hooks/rules-of-hooks': 'error',
    // 检查依赖项的声明
    'react-hooks/exhaustive-deps': 'warn',
    // 强制使用  defaultProps
    'react/require-default-props': 0,
    // 强制React的fragment标签写法
    'react/jsx-fragments': 0,
    // 防止多行jsx缺少圆括号
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    // 禁止某些 propTypes
    'react/forbid-prop-types': 0,
    // 强制组件方法顺序
    'react/sort-comp': 0,
    // 使用 JSX 时防止缺少 React
    'react/react-in-jsx-scope': 0,
    // 每行一个 JSX 元素
    'react/jsx-one-expression-per-line': 0,
    // 强制 generator 函数中 * 号周围使用一致的空格
    'generator-star-spacing': 0,
    // 强制在函数括号内使用一致的换行
    'function-paren-newline': 0,
    // 强制模块内的 import 排序
    'sort-imports': 0,
    // 强制类方法使用 this
    'class-methods-use-this': 0,
    // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    'no-confusing-arrow': 0,
    // 强制使用一致的换行风格
    'linebreak-style': ['error', 'unix'],
    // 禁止直接调用 Object.prototypes 的内置属性，Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    // 要求箭头函数体使用大括号
    'arrow-body-style': 0,
    // 要求箭头函数的参数使用圆括号
    'arrow-parens': 0,
    // 强制大括号内换行符的一致性
    'object-curly-newline': 0,
    // 强制隐式返回的箭头函数体的位置
    'implicit-arrow-linebreak': 0,
    // 强制操作符使用一致的换行符
    'operator-linebreak': 0,
    // 禁止对 function 的参数进行重新赋值
    'no-param-reassign': 2,
    // 强制在 function的左括号之前使用一致的空格
    'space-before-function-paren': 0,
    // 没有子组件的父组件使用自闭和标签
    'react/self-closing-comp': 1,
    'react/jsx-key': 1,
    /* --------------------------上面是umi自带的下面是额外添加的----------------------- */
    // 禁止使用++，--
    'no-plusplus': 0,
    // 不能有未定义的变量
    'no-undef': 2,
    // 禁止重复的函数声明
    'no-func-assign': 2,
    // 禁止修改const声明的变量
    'no-const-assign': 2,
    // 空行最多不能超过2行
    'no-multiple-empty-lines': [1, { max: 2 }],
    // 是否允许非空数组里面有多余的空格
    'array-bracket-spacing': [2, 'never'],
    // if while function 后面的{必须与if在同一行，java风格。
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    // 控制逗号前后的空格
    'comma-spacing': [2, { before: false, after: true }],
    // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
    'computed-property-spacing': [2, 'never'],
    // switch语句最后必须有default
    'default-case': 2,
    // 变量声明后是否需要空一行
    'newline-after-var': 0,
    // 如果if语句里面有return,后面不能跟else语句，禁止出现 if (cond) { return a } else { return b }，应该写为 if (cond) { return a } return b
    'no-else-return': 2,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    // 立即执行函数表达式的小括号风格
    'wrap-iife': [2, 'inside'],
    // 注释的斜线和星号后要加空格
    'spaced-comment': [
      0,
      'always',
      {
        block: {
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
    // new, delete, typeof, void, yield 等表达式前后必须有空格，-, +, --, ++, !, !! 等表达式前后不许有空格
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false,
      },
    ],
    // 必须使用解构 ...args 来代替 arguments
    'prefer-rest-params': 2,
    // if 后必须包含 { ，单行 if 除外
    curly: [2, 'multi-line', 'consistent'],
    // getter 必须有返回值，允许返回 undefined
    // 'getter-return': [2, { allowImplicit: true }],
    // 关键字前后必须有空格
    'keyword-spacing': 2,
    // new关键字后类名应首字母大写
    'new-cap': [
      2,
      {
        // 允许大写开头的函数直接执行
        capIsNew: false,
      },
    ],
    // class定义的类名不得与其它变量重名
    'no-class-assign': 2,
    // 函数参数禁止重名
    'no-dupe-args': 2,
    // 禁止 switch 中出现相同的 case
    'no-duplicate-case': 2,
    // 禁止重复 import
    'no-duplicate-imports': 0,
    // 禁止解构中出现空 {} 或 []
    'no-empty-pattern': 2,
    // 禁止额外的括号，仅针对函数体
    'no-extra-parens': [2, 'functions'],
    // 不允许使用 2. 或 .5 来表示数字，需要用 2、2.0、0.5 的格式
    'no-floating-decimal': 2,
    // 禁止对函数声明重新赋值
    'no-func-assign': 2,
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    // 驼峰命名格式
    '@typescript-eslint/camelcase': 0,
    // 特殊情况可将类型显示设置为any
    '@typescript-eslint/no-explicit-any': 0,
    // 允许接口命名以I开头
    '@typescript-eslint/interface-name-prefix': 0,
    // antd中引用style需要用require
    '@typescript-eslint/no-var-requires': 0,
    // mapStateToProps在之前就用到(typeof推断类型)
    '@typescript-eslint/no-use-before-define': 0,
    // 给函数默认值可以为空
    '@typescript-eslint/no-empty-function': 0,
    'import/no-unresolved': 'error',
  },
  settings: {
    // 自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect',
    },
    // 处理no-unresolved 无法识别alias造成的误报错误
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  parserOptions: {
    // 指定ESLint可以解析JSX语法
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  "linebreak-style": [0 ,"error", "windows"],
  // 全局变量声明
  globals: {
    SERVICE_URL: 'readonly',
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: 'readonly',
    REACT_APP_ENV: 'readonly',
  },
};
