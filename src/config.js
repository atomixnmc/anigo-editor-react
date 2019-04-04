const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3100,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 4210,
  language: 'English',
  timezone: 'UTC+9',
  app: {
    title: 'AniGo',
    description: 'AniGo',
    head: {
      titleTemplate: 'AniGo: %s',
      meta: [
        {name: 'description', content: 'AniGo.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'AniGo'},
        {property: 'og:image', content: 'logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'AniGo'},
        {property: 'og:description', content: 'AniGo.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@AniGo'},
        {property: 'og:creator', content: '@AniGo'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
