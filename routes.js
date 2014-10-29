module.exports = createRoutes

var createHandlers = require('./handlers.js')

function createRoutes(server, settings) {
  var handlers = createHandlers(server, settings)
  var routes = [
    'GET  /triage',                 handlers.triageHome,
    'POST /triage',                 handlers.startTriage,
    'GET  /thanks',                 handlers.thanks,
    'GET  /login',                  handlers.login,
    'POST /triage/{repo}/{name}/{number}', handlers.triageFeedback,
    'GET  /triage/{repo}/{name}/{number}', handlers.viewIssueTriage,
    'GET  /',                       handlers.homepage
  ]

  if (settings.serveStatic) {
    routes = routes.concat([
      'GET /public/{path*}',  handlers.static
    ])
  }

  routes.forEach(function(item, idx, all) {
    if (idx % 2 === 0) {
      return
    }

    var bits = all[idx - 1].split(/\s+/)
    var method = bits[0].toLowerCase()
    var path = bits[1]

    server.route({
      path: path,
      method: method,
      config: item
    })
  })
}
