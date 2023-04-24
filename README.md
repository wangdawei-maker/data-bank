### Frames
- UmiJS 核心框架 [UmiJS](https://umijs.org/)
- DvaJS 数据流管控 [DvaJS](https://dvajs.com/)
- React 基础框架 [React](https://reactjs.org/)
- TypeScript JS超集 [TypeScript](https://www.tslang.cn/)
- Less 样式预处理器 [Less](https://lesscss.org/)
- UmiHooks useRequest API接口请求 [Umi-Request](https://umijs.org/docs/max/request#userequest)
- Ant-Design 公共组件库 [Antd](https://pro.ant.design)
- JSDoc 文档注释规范 [JSDoc](https://jsdoc.zcopy.site/)

### Start Project
```bash
# 依赖安装
npm install
# 项目开发环境启动
npm start（开发环境） / npm run start:{env}（其他环境）
# 项目构建
npm run build（生产环境） / npm run build:{env}（其他环境）
```
### 目录介绍
```
├── config 项目配置目录
│   ├── config.ts // umi 配置文件  
│   ├── defaultSettings.ts // antd Pro 配置文件
│   ├── proxy.ts // 代理配置文件
│   └── routes.ts // 路由配置文件
│ 
├── mock 模拟数据目录
│ 
├── public 共享资源目录
│  
├── src 项目代码目录
│   ├── assets // 静态资源目录
│   ├── components // 公共组件目录
│   ├── layouts // 全局布局
│   ├── locales // i18N
│   ├── models model 存放目录
│   ├── pages // 页面文件目录
│   ├── services // 公共接口文件目录
│   ├── utils // 工具类目录
│   ├── styles // 样式目录
│   ├── global.less // 全局样式文件
│   ├── global.tsx
│   ├── manifest.json
│   ├── service-worker.js
│   └── typings.d.ts
├── .editorconfig //项目编码规范，需要 Editorconfig 插件支持，优先级比编辑器设置高
├── .eslintignore //eslint 忽略文件配置
├── .eslintrc.js //eslint 规则配置文件
├── .gitignore //git 忽略文件配置
├── .prettierignore
├── .prettierrc.js //prettier 规则配置文件
├── .stylelintrc.js // 样式规则配置文件
├── BEM 规范.xml //BEM 样式命名规范
├── jest.config.js
├── jsconfig.json
├── package-lock.json
├── package.json
├── README.md
├── settingsJson 配置.md
└── tsconfig.json
```
### Note
#### 需要装的插件 editorConfig eslint prettier Stylelint 这四个

editorConfig 负责为每个人提供正确的编辑器设置（vscode 需要安装插件支持，idea 不需要）
eslint 负责代码质量检测 相关代码规范设置请在 eslintrc 书写，且不要在 eslint 中增加代码格式规则
prettier 负责代码格式化
关于 eslint 和 prettier 的冲突问题，利用 eslint-config-prettier（prettier 覆盖 eslint） 和 eslint-plugin-prettier 插件， 移除 eslint 中任何代码格式化关的规则，并在 rules 中增加"prettier/prettier": "error"，将格式化错误认为 eslint 错误。
因为 UI 库推荐使用 hooks 开发 所以我也在 eslint 中添加了 hooks 规则
Stylelint 样式书写规范

#### src/styles 下的 vevor.global.less 文件是新视觉规范 2022 规定的颜色使用场景
这个要求新项目必须遵守。迁入项目根据情况决定是否遵守，如不遵守请注释.stylelintrc.js 文件中的 scale-unlimited/declaration-strict-value 这条规则。

scale-unlimited/declaration-strict-value 会要求 color 类的样式属性只能使用变量。为方便使用 commonStyle.less 中的变量已设为全局变量，每个 less 文件不需引入可直接使用。
使用参考： src/pages/ListTableList/ListTableList/index.less


### Constraint
#### Git
```Shell
Branch Control
- master
- dev

Tag Commit Control
- Version [ProjectName]_[DeveloperName]_[VersionName]_[Time]
git tag -a v1.0.0 -m '[Ydx_Passenger]_[Kylin]_[1.0.0]_[2019/10/23]'

Commit Control

<type>(<scope>): <subject>
空行
<body>
空行
<footer>

header:
1. type: 说明commit提交类型 如下7个标识
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
2. scope: 说明commit影响的范围
(store/xxx) (scripts/xxx) (models/xxx) 多个用*
3. subject 简短描述

body：
commit详细描述

footer：
不兼容变动 BREAKING CHANGE
关闭Issue: Close
```
#### Issue
##### 反馈缺陷
提供复现步骤，错误日志以及相关配置
##### 提交新需求
通过 issue 发起RFC提案 -> 讨论定稿-> 提交 Pull Request -> Code Review -> 发布  
###### 模板如下：
###### 背景
- 描述你希望解决的问题的现状
- 附上相关的 issue 地址
###### 思路
描述大概的解决思路，可以包含 API 设计和伪代码等
###### 跟进
后续编辑，附上对应的 Pull Request 地址，可以用 `- [ ] some task` 的方式。  
其他约束：
- 标题：[RFC] some title
- 标签：type: proposals
#### Issue报告
```
---
name: 'Bug report'
about: 'Report a bug to help us improve'
title: ''
labels: ''
assignees: ''
---

## 什么问题
清晰简要描述Bug问题.

## 分布复现步骤
1. 第一步做了什么
2. 第二步做了什么
3. ...

## 期望的行为
1. ...
2. ...

## 环境
- **系统名称**: Vevor-Admin/Vevor-User-Front ...
- **系统环境**:Chrome80.0.3987.87/Safari13.0.1 ...
- **框架版本**: umi3/antd4...
- **工具版本**: MySql5.9/RabbitMQ3.8.2/...
- **测试工具**: 自动化测试/POSTMAN/WireShark/Charles
- **网络环境**: WiFi/4G/3G/Offline
```
