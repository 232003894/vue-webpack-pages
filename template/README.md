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
1. vueh5plus [[文档]](https://232003894.github.io/vueh5plus/index.html) [[git]](https://github.com/232003894/vueh5plus) 
1. 多页模板 [[git]](https://github.com/232003894/vue-webpack-pages)
1. webpack [[中文]](https://doc.webpack-china.org/concepts/)
1. vue-loader [[中文]](https://vue-loader.vuejs.org/zh-cn/)
