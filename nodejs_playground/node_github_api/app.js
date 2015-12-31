//console.log('Version: ' + process.version);
config              = require('./lib/config');

var everyauth       = require('everyauth'),
    express         = require('express'),
    swig            = require('swig'),
    cons            = require('consolidate'),
    app             = express(),
    http            = require('http'),
    https           = require('https'),
    connect         = require('connect'),
    session         = require('express-session'),
    redis           = require('connect-redis')(session),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    methodOverride  = require('method-override'),
    errorHandler    = require('express-error-handler'),
    env             = process.env.NODE_ENV || 'development';
    sesh            = new redis({
                            host: config.redis_host,
                            port: config.redis_port,
                            pass: config.redis_pw
                          });
app.use(session({
  store: sesh,
  secret: config.redis_secret,
  resave: true,
  saveUninitialized: true
}));

everyauth.debug = true;

everyauth.github
  .appId(config.gh_clientId)
  .appSecret(config.gh_secret)
  .entryPath('/auth/github')
  .callbackPath('/auth/github/callback')
  .scope('gist,public_repo,user')
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

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(everyauth.middleware());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

if ( 'development' == env ) {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
} else if ( 'production' == env ) {
  app.use(errorHandler());
}

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
              method: "GET",
              headers: { 'User-Agent': 'nodejs_github_api' }
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

app.listen(process.env.PORT || 8888);