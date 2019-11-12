# Create react app with SSR lambda

A demo running a Create react app with server-side render through a `@now/node` lambda.

[Demo here](https://now-cra-with-ssr.gerhardsletten.now.sh)

## Why

Both `Next.js` and `GatsbyJS` are great framework for SSR and React combined, but they also lock you into their framework, more and more encreasing the time it will take to switch to another framework or now framework. Also you can forget about using `React Router` , and if you leave the main path in "how things are done in the framework" you often spend more time debugging the library, then the modules you wish to use. 

## Framework

* `Create react app` with `react-app-rewired` for custom, the important part is this webpack-plugin `@loadable/webpack-plugin`
* GraphQl backend proxied to `localhost:8000` in local development, see backend/index.js
* `backend/ssr.js` lambda which require a locally build server-side package of the react-application

## Development

* In one shell-window: `cd backend && npm run dev`
* In main shell-window `npm start` 

## Deployment on Zeit now

* `npm run deploy-now`

## Deployment on linux-box with nginx

To run this on own gear run backend/index.js and backend/ssr.js with Zeit's `Micro` and `PM2` and serve them with nginx-config like this:

```
server {
  listen 80;
  server_name coolsite.com;
  root /home/user/app/build;
  location /graphql {
    proxy_pass http://127.0.0.1:8000;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
  location / {
    try_files $uri @ssr;
  }
  location @ssr {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

## Credits

Inspired by [github.com/zeusdeux/ssr-on-zeit](https://github.com/zeusdeux/ssr-on-zeit), but with my own preferred setup with Styled Components, React Helmet, react-app-rewired and Graphql and linked schema.
