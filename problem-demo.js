const util = require('util')
const got = require('got')
const sourceMap = require('source-map')
const SourceNode = sourceMap.SourceNode
const SourceMapConsumer = sourceMap.SourceMapConsumer

const node = new SourceNode()

const codeUrl = 'http://localhost:8081/index.ios.bundle?platform=ios&dev=false&minify=true'
const mapUrl = 'http://localhost:8081/index.ios.map?platform=ios&dev=false&minify=true'

let reactCode
let reactMap

console.log('downloading code')
got(codeUrl).then(response => {
  reactCode = response.body
  console.log('downloading map')
  return got(mapUrl)
}).then(response => {
  reactMap = response.body
}).then(() => {
  console.log('running through source map')
  node.add(SourceNode.fromStringWithSourceMap(
    reactCode,
    new SourceMapConsumer(reactMap)
  ));
}).catch(err => {
  console.log(util.inspect(err))
})
