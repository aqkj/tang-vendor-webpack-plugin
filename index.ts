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
      // console.log(compilation.entrypoints.keys())
      compilation.entrypoints.forEach((entry, key) => {
        const chunks = entry.chunks.slice()
        const lastChunk = entry.chunks[entry.chunks.length - 1]
        // console.log(lastChunk)
        const file = lastChunk.files.find((f: any) => path.extname(f) === '.js')
        const extname = path.extname(file)
        const concatSource = compilation.assets[file]
        let content = concatSource.source()
        chunks.pop()
        // console.log(Object.keys(chunks))
        chunks.reverse().map((chunk: any) => {
          chunk.files.forEach((cfile: any) => {
            if(path.extname(cfile) === extname) {
              content = `require("${path.relative(file, cfile).slice(3)}");\n${content}`
            }
          })
        });
        // console.log(content);
        (compilation as any).updateAsset(
          file,
          () => new ConcatSource(content)
        )
      })
    })
  }
}