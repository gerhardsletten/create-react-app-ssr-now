# Create react app with SSR lambda

A demo running a Create react app with server-side render through a `@now/node` lambda.

[Demo here](https://now-cra-with-ssr.gerhardsletten.now.sh)

## Framework

* `Create react app` with `react-app-rewired` for custom, the important part is this webpack-plugin `@loadable/webpack-plugin`
* GraphQl backend proxied to `localhost:8000` in local development, see backend/index.js
* `backend/ssr.js` lambda which require a locally build server-side package of the react-application

## Development

* In one shell-window: `cd backend && npm run dev`
* In main shell-window `npm start` 

## Deployment

* `npm run deploy-now`

## Credits

Inspired by [github.com/zeusdeux/ssr-on-zeit](https://github.com/zeusdeux/ssr-on-zeit), but with my own preferred setup with Styled Components, React Helmet, react-app-rewired and Graphql and linked schema.
