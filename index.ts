/**
 * 入口
 * @author xiaoqiang <465633678@qq.com>
 * @created 2019/10/26 10:25:03
 */
import webpack from 'webpack'
const ConcatSource = require("webpack-sources").ConcatSource
import path from 'path'
export default class TangVendorWebpackPlugin implements webpack.Plugin {
  apply(compiler: webpack.Compiler) {
    compiler.hooks.emit.tap('TangVendorWebpackPlugin', (compilation: webpack.compilation.Compilation) => {
      compilation.entrypoints.forEach((entry, key) => {
        const chunks = entry.chunks.slice()
        const lastChunk = entry.chunks[entry.chunks.length - 1]
        const file = lastChunk.files[0]
        const extname = path.extname(file)
        const concatSource = compilation.assets[file]
        let content = concatSource.source()
        chunks.pop()
        chunks.reverse().map((chunk: any) => {
          chunk.files.forEach((cfile: any) => {
            if(path.extname(cfile) === extname) {
              content = `require("${path.relative(file, cfile).slice(3)}");\n${content}`
            }
          })
        });
        (compilation as any).updateAsset(
          file,
          () => new ConcatSource(content)
        )
      })
    })
  }
}