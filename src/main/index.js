import template from './main.jade';
import controller from './main-controller.js';
import home from './home';
import contact from './contact';
import impressum from './impressum';
import content from './content';
import download from './download';
import register from './register';
import author from './author';

export default {
  name: 'main',
  url: '',
  abstract: true,
  templateUrl: template,
  controller,
  controllerAs: 'main',
  resolve: {
    meta: /*@ngInject*/function(Restangular){
      return Restangular.all('meta').getList();
    },
    markdown: /*@ngInject*/function($q,$ocLazyLoad){
      return $q(function(resolve){
        require.ensure([],function(){
          const md = require('wbt-text');
          return resolve($ocLazyLoad.inject(md));
        });
      });
    }
  },
  children: [
    home,
    contact,
    impressum,
    content,
    download,
    register,
    author
  ]
};
