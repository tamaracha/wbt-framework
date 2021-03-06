'use strict';
const Router = require('koa-router');
const api = module.exports = new Router({prefix: '/api'});

const config = require('config').get('jwt');
const ctrl = require('./controllers');

// middleware
const Body = require('koa-body');
const body = Body();
const multi = Body({
  multipart: true,
  formidable: {hash: 'md5'}
});
const etag = require('koa-etag');
const lastModified = require('./middleware/last-modified');
const jwtConfig = config.options;
jwtConfig.secret = config.secret;
const jwt = require('koa-jwt')(jwtConfig);
const log = require('./middleware/log');
const roles = require('./middleware/roles');
const auth = require('./middleware/auth');
const queryToken = require('./middleware/query-token');

api
.use(lastModified, etag())
.use(roles.middleware());

/* routes */
// meta
const meta = new Router();
meta.get('/',ctrl.meta.index);
meta.post('/',ctrl.meta.create);
meta.get('/:meta',ctrl.meta.show);
meta.patch('/:meta',body,ctrl.meta.update);
meta.delete('/:meta',ctrl.meta.destroy);
api.use('/meta',meta.routes());

// users
const users=new Router();
users.use('/:user',jwt,roles.can('access user'));
users.head('/',ctrl.user.check);
users.post('/',body,ctrl.user.create);
users.get('/:user',ctrl.user.show);
users.patch('/:user',body,ctrl.user.update);
users.delete('/:user',ctrl.user.destroy);
users.post('/:user/done',body,ctrl.done.create);
users.put('/:user/password',body,ctrl.password.change);
api.use('/users',users.routes());
api.get('/tokens/new',auth,ctrl.token.new);

const tests=new Router();
tests.get('/',roles.can('access content'),ctrl.test.index);
tests.post('/',roles.can('edit content'),body,ctrl.test.create);
tests.get('/:test',roles.can('access content'),ctrl.test.show);
tests.patch('/:test',roles.can('edit content'),body,ctrl.test.update);
tests.delete('/:test',roles.can('edit content'),ctrl.test.destroy);
api.use('/tests',jwt,tests.routes());

// units
const units=new Router();
units.get('/',roles.can('access content'),ctrl.unit.index);
units.post('/',roles.can('edit content'),body,ctrl.unit.create);
units.get('/:unit',roles.can('access content'),log,ctrl.unit.show);
units.patch('/:unit',roles.can('edit content'),body,ctrl.unit.update);
units.delete('/:unit',roles.can('edit content'),ctrl.unit.destroy);
const topics=new Router();
topics.get('/',roles.can('access content'),ctrl.topic.index);
topics.post('/',roles.can('edit content'),body,ctrl.topic.create);
topics.get('/:topic',roles.can('access content'), log, ctrl.topic.show);
topics.patch('/:topic',roles.can('edit content'),body,ctrl.topic.update);
topics.delete('/:topic',roles.can('edit content'),ctrl.topic.destroy);
units.use('/:unit/topics',topics.routes());
/*
const summaries=new Router();
summaries.get('/test',ctrl.summary.test);
summaries.get('/akzeptanz',ctrl.summary.akzeptanz);
units.use('/:unit/summaries',roles.can('access content'),summaries.routes());
*/
api.use('/units',jwt,units.routes());

// guesses
const guesses = new Router();
guesses.get('/', ctrl.guess.index);
guesses.post('/',body,ctrl.guess.create);
guesses.get('/newest', ctrl.guess.new);
guesses.get('/:guess', ctrl.guess.show);
guesses.post('/:guess/responses',body,ctrl.response.create);
api.use('/guesses',jwt,roles.can('access content'),guesses.routes());

api.post('/ratings',jwt,roles.can('access content'),body,ctrl.rating.create);
api.post('/comments',jwt,roles.can('access content'),body,ctrl.comment.create);
api.get('/views', queryToken, jwt, roles.can('edit content'), ctrl.view.index);
api.get('/watches', queryToken, jwt, roles.can('edit content'), ctrl.watch.index);
api.post('/watches',jwt,body,ctrl.watch.create);

// images
const images = new Router();
images.get('/',jwt,roles.can('access content'),ctrl.image.index);
images.post('/',jwt,roles.can('edit content'),multi,ctrl.image.create);
images.get('/:image',ctrl.image.show);
images.put('/:image',jwt,roles.can('edit content'),multi,ctrl.image.update);
images.delete('/:image',jwt,roles.can('edit content'),ctrl.image.destroy);
api.use('/images',images.routes());

api.get('/downloads',
  queryToken,
  jwt,
  roles.can('access content'),
  ctrl.download.getUnits,
  ctrl.download.getMarkdown,
  ctrl.download.getFile
);

const subjects=new Router();
subjects.get('/',ctrl.subject.index);
subjects.post('/',jwt,roles.can('edit content'),body,ctrl.subject.create);
subjects.get('/:subject',ctrl.subject.show);
subjects.put('/:subject',jwt,roles.can('edit content'),body,ctrl.subject.update);
subjects.delete('/:subject',jwt,roles.can('edit content'),ctrl.subject.destroy);
api.use('/subjects',subjects.routes());
