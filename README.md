# vue-webpack-pages-boilerplate

> multiplePages Webpack setup with hot-reload, lint-on-save,css extraction..

> This template is Vue 2.0 compatible.

> 改造了[官方webpack模板](https://github.com/vuejs-templates/webpack),去掉文档和测试部分.


## Documentation

- [For this template](http://vuejs-templates.github.io/webpack): common questions specific to this template are answered and each part is described in greater detail
- [For Vue 2.0](http://vuejs.org/guide/): general information about how to work with Vue, not specific to this template

## Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

``` bash
$ npm install -g vue-cli
$ vue init 232003894/vue-webpack-pages my-project
$ cd my-project
$ npm install
$ npm run dev
```

The development server will run on port 8080 by default. If that port is already in use on your machine, the next free port will be used.

## What's Included

- `npm run dev`: first-in-class development experience.
  - Webpack + `vue-loader` for single file Vue components.
  - State preserving hot-reload
  - State preserving compilation error overlay
  - Lint-on-save with ESLint
  - Source maps

- `npm run build`: Production ready build.
  - JavaScript minified with [UglifyJS v3](https://github.com/mishoo/UglifyJS2/tree/harmony).
  - HTML minified with [html-minifier](https://github.com/kangax/html-minifier).
  - CSS across all components extracted into a single file and minified with [cssnano](https://github.com/ben-eb/cssnano).
  - Static assets compiled with version hashes for efficient long-term caching, and an auto-generated production `index.html` with proper URLs to these generated assets.
  - Use `npm run build --report`to build with bundle size analytics.

### 模板修改了哪些
- .eslintrc.js 增加了2个规则
- build文件夹
  - 新增了 webpack.ext.js 文件
  - build.js 中 const webpackConfig = require('./webpack.ext')
- package.json
  - scripts.dev -> "webpack-dev-server --inline --progress --config build/webpack.ext.js"
  - devDependencies 增加
    - "clean-webpack-plugin": "^0.1.16"
    - "open-browser-webpack-plugin": "^0.0.5"
- src目录调整

## src目录
### 1.1 src/assets 资源文件夹：公共字体、样式、图片、js等
### 1.2 src/components 公共组件文件夹
### 1.3 src/pages 多页面应用页面文件目录
  - 页面独占文件夹，一个文件夹一个页面，文件夹名称为页面名称,例如index.html
  - 可以多级，页面名称组合：user_index.html
  - 页面文件夹中
    - `entry.js`：页面入口文件
    - `template.html`：【非必须】页面模板文件
    - `App.vue`：页面模板文件
### 1.4 src/template.html 共用页面模板


