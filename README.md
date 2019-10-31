# @zouzhiqiang/tang-vendor-webpack-plugin

[![npm (scoped)](https://img.shields.io/npm/v/@zouzhiqiang/tang-vendor-webpack-plugin.svg)](https://www.npmjs.com/package/@zouzhiqiang/tang-vendor-webpack-plugin)
[![Downloads](http://img.shields.io/npm/dm/gulp-cli.svg)](https://www.npmjs.com/package/@zouzhiqiang/tang-vendor-webpack-plugin)

tang小程序开发引入资源插件

## Install

```
$ npm install --save-dev @zouzhiqiang/tang-vendor-webpack-plugin
```

## Usage

```javascript
const TangVendorWebpackPlugin = require('@zouzhiqiang/tang-vendor-webpack-plugin');
{
    // ...webpack配置
    plugins: [
        new TangVendorWebpackPlugin()
    ]
}
```