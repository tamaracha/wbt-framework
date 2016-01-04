import _ from 'lodash';
export default /*@ngInject*/class BasicsController{
  constructor($scope,unit){
    const modelOptions = {
      updateOn: 'default blur',
      debounce: {
        default: 500,
        blur: 0
      }
    };
    this.fields = [{
      key: 'title',
      type: 'horizontalInput',
      modelOptions,
      templateOptions: {
        type: 'text',
        label: 'Titel',
        placeholder: 'Titel des Kapitels',
        required: true
      }
    },
    {
      key: 'subtitle',
      type: 'horizontalInput',
      modelOptions,
      templateOptions: {
        type: 'text',
        label: 'Untertitel',
        placeholder: 'Untertitel des Kapitels'
      }
    },
    {
      key: 'requires',
      type: 'horizontalMultiCheckbox',
      modelOptions,
      templateOptions: {
        label: 'Voraussetzungen',
        valueProp: '_id',
        labelProp: 'title'
      }
    },
    {
      key: 'test.active',
      type: 'horizontalCheckbox',
      templateOptions: {
        label: 'Test für dieses Kapitel aktivieren'
      }
    },
    {
      key: 'test.shuffle',
      type: 'horizontalCheckbox',
      templateOptions: {
        label: 'Testaufgaben in zufälliger Reihenfolge darbieten'
      }
    },
    {
      key: 'description',
      type: 'horizontalMarkdownArea',
      modelOptions,
      templateOptions: {
        label: 'Beschreibung',
        required: true,
        placeholder: 'Beschreibungstext'
      }
    }];
    $scope.$watchCollection('units.units',(val) => {
      this.fields[2].templateOptions.options = _.reject(val,{_id: unit._id});
    },true);
  }
}
