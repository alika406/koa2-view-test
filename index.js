const Koa = require('koa')
const serve = require('koa-static')

const app = new Koa()

app
  .use(serve(__dirname + '/views'))
  .use(pageNotFound)
  .listen(3004)

async function pageNotFound(ctx) {
  // we need to explicitly set 404 here
  // so that koa doesn't assign 200 on body=
  ctx.status = 404

  switch (ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html'
      ctx.body = '<p>Page Not Found</p>'
      break
    case 'json':
      ctx.body = {
        message: 'Page Not Found'
      }
      break
    default:
      ctx.type = 'text'
      ctx.body = 'Page Not Found'
  }
}