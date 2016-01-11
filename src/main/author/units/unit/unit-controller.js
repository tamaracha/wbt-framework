import _ from 'lodash';
export default /*@ngInject*/class UnitCtrl{
  constructor(jsonpatch,unit,$scope, $http){
    this.unit = unit.data;
    this.patches = [];
    this.error = null;
    $scope.units.fields[3].model = this.unit.test;
    $scope.units.fields[4].model = this.unit.test;
    function watcher(){
      return _.pick($scope.unit.unit, ['_id', 'title', 'subtitle', 'description', 'requires', 'test']);
    }
    $scope.$watch(watcher,(val, oldVal) => {
      this.patches = jsonpatch.compare(oldVal,val);
      if(this.patches.length === 0){return;}
      return $http.patch('api/units/'+this.unit._id,this.patches,{headers: {'if-unmodified-since': this.unit.updatedAt}})
      .then(
        (res) => {
          this.patches = [];
          const lmh = res.headers('last-modified');
          if(lmh){
            this.unit.updatedAt = lmh;
          }
          this.error = null;
        },
        (e) => {
          this.error = e;
        }
      );
    },true);
  }
}
