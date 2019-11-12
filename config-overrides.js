const path = require('path')
const {
  override,
  addBabelPlugins,
  addWebpackAlias,
  addBundleVisualizer,
  addWebpackPlugin
} = require('customize-cra')
const LoadablePlugin = require('@loadable/webpack-plugin')

const resolveModules = () => config => {
  config.resolve = Object.assign({}, config.resolve, {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  })
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
    )
)
