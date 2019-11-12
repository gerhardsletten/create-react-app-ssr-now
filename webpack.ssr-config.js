const path = require('path')
const webpack = require('webpack')
const mode = 'production'
const jsLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      caller: { target: 'node' },
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { node: 'current' },
            modules: 'commonjs'
          }
        ],
        '@babel/react',
        'react-app'
      ],
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@loadable/babel-plugin',
        'babel-plugin-styled-components'
      ]
    }
  }
}

module.exports = [
  {
    mode,
    context: path.resolve(__dirname),
    entry: { server: './src/server.js' },
    output: {
      libraryTarget: 'commonjs2',
      path: path.resolve(__dirname),
      filename: 'generated-ssr-helper.js'
    },
    resolve: {
      modules: ['src', 'node_modules']
    },
    optimization: {
      minimize: false
    },
    target: 'node',
    module: {
      rules: [jsLoader]
    },
    node: {
      __dirname: false
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })
    ]
  }
]
