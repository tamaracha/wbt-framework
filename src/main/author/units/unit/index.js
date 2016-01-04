import template from './unit.jade';
import controller from './unit-controller';
import basics from './basics';
import topics from './topics';
import tests from './tests';

export default {
  name: 'unit',
  url: '/:unit',
  templateUrl: template,
  controller,
  controllerAs: 'unit',
  abstract: true,
  resolve: {
    jsonpatch: /*@ngInject*/function($q){
      return $q(function(resolve,reject){
        require.ensure([],function(){
          const jsonpatch = require('fast-json-patch');
          return jsonpatch ? resolve(jsonpatch) : reject('jsonpatch not loaded');
        });
      });
    },
    unit: /*@ngInject*/function(Restangular,$stateParams){
      const query = {
        projections: 'title subtitle description requires test'
      };
      return Restangular.one('units',$stateParams.unit).get(query);
    }
  },
  children: [
    basics,
    topics,
    tests
  ]
};
