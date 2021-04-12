'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  URL_REFRESH: '"http://localhost:5000/refresh"',
  URL_BATCH: '"http://localhost:5000/graphql/batch"',
  URL_UPDATE: '"http://localhost:5000/homes"'
})
