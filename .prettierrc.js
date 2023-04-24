// const fabric = require('@umijs/fabric');

// module.exports = {
//   ...fabric.prettier,
// };

module.exports = {
  //最大长度100字符
  printWidth: 100,
  //行末分号
  semi: true,
  //单引号
  singleQuote: true,
  //尽可能使用尾随逗号（包括函数参数）
  trailingComma: 'all',
  //在对象文字中打印括号之间的空格。
  bracketSpacing: true,
  // > 标签放在最后一行的末尾，而不是单独放在下一行
  jsxBracketSameLine: false,
  // 给对象里的属性名是否要加上引号，默认为as-needed，即根据需要决定，如果不加引号会报错则加，否则不加
  // quoteProps: 'as-needed',
  //箭头圆括号
  arrowParens: 'avoid',
  //在文件顶部插入一个特殊的 @format 标记，指定文件格式需要被格式化。
  insertPragma: false,
  //缩进
  tabWidth: 2,
  //使用tab还是空格
  useTabs: false,
  // 在jsx里是否使用单引号
  jsxSingleQuote: false,
};
