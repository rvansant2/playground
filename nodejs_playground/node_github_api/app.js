//console.log('Version: ' + process.version);
config          = require('./lib/config');

var express     = require('express'),
    swig        = require('swig'),
    cons        = require('consolidate'),
    app         = express(),
    http        = require('http'),
    https       = require('https'),
    connect     = require('connect'),
    redis       = require('connect-redis')(express),
    everyauth   = require('everyauth'),
    sesh        = new redis({
                            host: config.redis_host,
                            port: config.redis_port,
                            pass: config.redis_pw
                          });

everyauth.debug = true;

everyauth.github
  .appId(config.gh_clientId)
  .appSecret(config.gh_secret)
  .entryPath('/auth/github')
  .callbackPath('/auth/github/callback')
  .scope('gist')
  .findOrCreateUser(function (session, accessToken, accessTokenExtra, githubUserMetadata) {
    session.oauth = accessToken;
    return session.uid = githubUserMetadata.login;
  }).redirectPath('/');
everyauth.everymodule.handleLogout(function (req, res) {
  req.logout(); 
  req.session.uid = null;
  res.writeHead(303, { 'Location': this.logoutRedirectPath() });
  res.end();
});

swig.init({
  root: __dirname + '/views', 
  allowErrors: true
});

app.configure(function() {
  app.engine('html', cons.swig);
  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({store: sesh, secret: config.redis_secret}));
  app.use(everyauth.middleware());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
 
app.configure('production', function() {
  app.use(express.errorHandler());
});


app.get('/',function(req, res) {
  if (req.session && req.session.uid) {
      return res.redirect('/board');
  }
  res.render('login', {header: 'Github Feed'});
});

app.get('/board',function(req, res) {
  if (!req.session.uid) {
      return res.redirect('/');
  }
  
  var repos,
      opts = {
              host: "api.github.com",
              path: '/user/repos?access_token=' + req.session.oauth,
              method: "GET"
      },
      request = https.request(opts, function(resp) {
        var data = "";
        resp.setEncoding('utf8');
        resp.on('data', function(chunk) {
          data += chunk;
        });
        resp.on('end', function () {
          repos = JSON.parse(data);
          var repos_url = req.session.auth.github.user.repos_url;
          res.render('board', {header: 'Github Feed', username: req.session.uid, repos: repos, user: req.session.auth.github.user, repos_url: repos_url.replace('api.', '')});
        });
      });
      request.end();
});

app.listen(process.env.PORT || 8001);