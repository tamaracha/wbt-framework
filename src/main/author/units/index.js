import template from './units.jade';
import controller from './units-controller.js';
import newUnit from './new';
import unit from './unit';

export default {
  name: 'units',
  url: '/units',
  templateUrl: template,
  controller,
  controllerAs: 'units',
  abstract: true,
  resolve: {
    units: ['$http', function($http){
      const config = {
        method: 'GET',
        url: 'api/units',
        params: {
          projections: 'title',
          options: {sort: 'position'}
        }
      };
      return $http(config);
    }]
  },
  children: [
    newUnit,
    unit
  ]
};
