"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ConcatSource = require("webpack-sources").ConcatSource;
var path_1 = __importDefault(require("path"));
var TangVendorWebpackPlugin = /** @class */ (function () {
    function TangVendorWebpackPlugin() {
    }
    TangVendorWebpackPlugin.prototype.apply = function (compiler) {
        compiler.hooks.emit.tap('TangVendorWebpackPlugin', function (compilation) {
            // console.log(compilation.entrypoints.keys())
            compilation.entrypoints.forEach(function (entry, key) {
                var chunks = entry.chunks.slice();
                var lastChunk = entry.chunks[entry.chunks.length - 1];
                // console.log(lastChunk)
                var file = lastChunk.files.find(function (f) { return path_1.default.extname(f) === '.js'; });
                var extname = path_1.default.extname(file);
                var concatSource = compilation.assets[file];
                var content = concatSource.source();
                chunks.pop();
                // console.log(Object.keys(chunks))
                chunks.reverse().map(function (chunk) {
                    chunk.files.forEach(function (cfile) {
                        if (path_1.default.extname(cfile) === extname) {
                            content = "require(\"" + path_1.default.relative(file, cfile).slice(3) + "\");\n" + content;
                        }
                    });
                });
                // console.log(content);
                compilation.updateAsset(file, function () { return new ConcatSource(content); });
            });
        });
    };
    return TangVendorWebpackPlugin;
}());
exports.default = TangVendorWebpackPlugin;
