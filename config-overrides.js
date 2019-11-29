const path = require('path')
const {
  override,
  addBabelPlugins,
  addWebpackAlias,
  addBundleVisualizer,
  addWebpackPlugin
} = require('customize-cra')
const LoadablePlugin = require('@loadable/webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')

const resolveModules = () => config => {
  config.resolve = Object.assign({}, config.resolve, {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  })
  return config
}

function findSWPrecachePlugin(element) {
  return element.constructor.name === 'GenerateSW'
}

const fixReplaceAndInjectWorkboxPlugin = () => config => {
  const swPrecachePluginIndex = config.plugins.findIndex(findSWPrecachePlugin)
  // Remove the swPrecachePlugin if it was found
  if (swPrecachePluginIndex !== -1) {
    config.plugins.splice(swPrecachePluginIndex, 1) // mutates
  }
  config.plugins.push(
    new InjectManifest({
      swSrc: path.join(__dirname, 'src', 'custom-sw.js'),
      importWorkboxFrom: 'local',
      exclude: [/\.map$/, /\.json$/]
    })
  )
  return config
}

module.exports = override(
  ...addBabelPlugins(
    '@loadable/babel-plugin',
    'react-hot-loader/babel',
    'babel-plugin-styled-components'
  ),
  addWebpackAlias({
    'react-dom': '@hot-loader/react-dom'
  }),
  resolveModules(),
  process.env.ANALYZE && addBundleVisualizer(),
  process.env.NODE_ENV === 'production' &&
    addWebpackPlugin(
      new LoadablePlugin({
        writeToDisk: true
      })
    ),
  process.env.NODE_ENV === 'production' && fixReplaceAndInjectWorkboxPlugin()
)
