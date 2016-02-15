import template from './unit.jade';
import controller from './unit-controller';
import basics from './basics';
import topic from './topic';
import tests from './tests';

export default {
  name: 'unit',
  url: '/:unit',
  templateUrl: template,
  controller,
  controllerAs: 'unit',
  abstract: true,
  resolve: {
    jsonpatch: ['$q', function($q){
      return $q(function(resolve,reject){
        require.ensure([],function(){
          const jsonpatch = require('fast-json-patch');
          return jsonpatch ? resolve(jsonpatch) : reject('jsonpatch not loaded');
        });
      });
    }],
    unit: ['$http', '$stateParams', function($http, $stateParams){
      const config = {
        method: 'GET',
        url: 'api/units/'+$stateParams.unit,
        params: {
          projections: 'title subtitle description requires topics._id topics.title test'
        }
      };
      return $http(config);
    }]
  },
  children: [
    basics,
    tests,
    topic
  ]
};
