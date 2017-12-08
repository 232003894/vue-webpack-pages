# {{ name }}

> {{ description }}

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
{{#unit}}

# run unit tests
npm run unit
{{/unit}}
{{#e2e}}

# run e2e tests
npm run e2e
{{/e2e}}
{{#if_or unit e2e}}

# run all tests
npm test
{{/if_or}}
```

## 参考
- [本模板](https://github.com/232003894/vue-webpack-pages)
- [官方模板](http://vuejs-templates.github.io/webpack)
- [Vue2 中文](https://cn.vuejs.org/v2/guide/index.html)
- [vue h5 plus 文档](https://232003894.github.io/vueh5plus/index.html)  [仓库](https://github.com/232003894/vueh5plus) 
- [webpack 中文](https://doc.webpack-china.org/concepts/)
- [vue-loader中文](https://vue-loader.vuejs.org/zh-cn/)
