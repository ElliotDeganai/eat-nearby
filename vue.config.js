const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  configureWebpack: {
    // It will be merged into the final Webpack config
    plugins: [
      new CopyPlugin(  [
        {
          from: 'src/data',
          to: 'public/'
        }
      ]),
    ],
  }
}

/* new CopyWebpackPlugin(
  [
    {
      from: 'C:\\wamp\\www\\eat-nearby\\src\\data',
      to: 'C:\\wamp\\www\\eat-nearby\\public',
      toType: 'dir',
      ignore: [
        '.DS_Store'
      ]
    }
  ]
),
{
  patterns: [
    {
      from: 'src/data',
      to: 'public'
    }
  ],
  options: {}
}
],
entry: {
app: [
  './src/main.js'
]
} */