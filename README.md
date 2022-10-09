# campus_app_fe

# 项目地址

- 后端项目地址：https://github.com/LevyEvans-s/campus-rd

- 前端项目地址：https://github.com/spicylemonhaha/campus_app_fe

# 安装说明

1. 安装运行

```
//　没安装pnpm的先安装一下
npm install -g pnpm
pnpm i
pnpm dev:指定平台
```

2. 流水线部署&发布

合并到 develop 之后会通过 github actions 自动部署 H5 http://campus_fe.koto-marvelous.com/#/

# 开发规范

## git 规范

1. commit 规范

   ```Plain
   'WIP', // 开发中
   'feat', // 新特性
   'improvement', // 加强现有特性
   'fix', // 修补bug
   'refactor', // 重构
   'docs', // 文档
   'test', // 单元测试
   'config', // 配置文件
   'style', // 格式需改
   'perf', // 性能提升
   'ci', // ci
   'revert', // 版本回退

   // 例如
   commit -m 'feat: 增加登录模块'
   commit -m 'fix: 重构axios封装逻辑'
   ```

2. 分支模型

   - master 用于存放完美运行的代码

   - develop 分支用于发布，每次发布之后都要往 master 合并一次

   - featrue/xxx，用于开发，全部从 develop 上面拉出来的

3. 提交 pr 的一些规则

不要积攒太多代码，开发完一个模块就提交一次，通过 cr 提前规避风险

# 开发范式

整体目录解释

```
├─.husky				// husky代码检查
│  └─_
├─.vscode				// vscode配置
└─src
│   ├─api				// api接口
│   ├─components        // 公共组件
│   ├─pages				// 页面
│   │  ├─DynamicGround
│   │  └─UserCenter
│   │      └─components // 页面组件
│   ├─static			// 静态资源
│   ├─constant			// 常量
│   └─utils				// 公共方法
├─eslintrc.json 		// eslint
├─commitlint.config.js  // commitlint校验
├─preitter.config.js	// preitter规则
├─vite.config.js		// vite配置
```

## 组件层面

1. 所有 vue 文件需要用大驼峰命名法
2. 使用 composition api
3. 组件 props 需要写类型
4. 组件的 ref 变量需要写类型
5. 公共组件放在 components
6. 私有组件在当前页面下创建 components
7. 单文件超出 400 行需拆分
8. 可复用 hooks 需要拆分
9. 可以抽出的常量要单独写一个常量文件

## 函数层面

1. 公共函数需要对入参写 ts 类型，不能随意写 any

## 编码风格层面

遵循 eslint 和 preitter 即可。

## 测试

提交 PR 前，app、fe、小程序都要测试。
