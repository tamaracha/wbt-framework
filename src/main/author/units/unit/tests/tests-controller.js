import _ from 'lodash';
import removeModal from '../../remove-modal';
export default class TestsCtrl{
  constructor(tests, $state, $stateParams, $http, $uibModal){
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$http = $http;
    this.$uibModal = $uibModal;
    this.removeModal = removeModal('test');
    this.tests = tests.data;
    this.test = this.newDefaults;
    this.fields = this.newFields;
    this.init();
  }
  get newDefaults(){
    return {
      type: 'single',
      choices: [],
      unit: this.$stateParams.unit
    };
  }
  create(){
    return this.$http.post('api/tests',this.test)
    .then(
      (res) => {
        this.tests.push(res.data);
        this.test = this.newDefaults;
        this.selected = res.data;
        this.select();
      },
      (e) => {
        this.error = e;
      }
    );
  }
  remove(){
    return this.$uibModal.open(this.removeModal)
    .result
    .then(() => {
      return this.$http.delete('api/tests/'+this.selected._id);
    })
    .then(
      () => {
        _.remove(this.tests,{_id: this.selected._id});
        this.selected = null;
        this.select();
      },
      (e) => {
        this.error = e;
      }
    );
  }
  init(){
    if(this.$state.params.test){
      this.selected = _.find(this.tests,{_id: this.$state.params.test});
    }
    else{this.selected = null;}
  }
  select(){
    if(!this.selected){
      this.$state.go('main.author.units.unit.tests');
    }
    else{
      this.$state.go('main.author.units.unit.tests.test', {test: this.selected._id});
    }
  }
  get newFields(){
    return [{
      type: 'horizontalMarkdownArea',
      key: 'text',
      templateOptions: {
        label: 'Aufgabenstamm',
        required: true,
        placeholder: 'Frage oder Aussage'
      }
    },
    {
      type: 'horizontalRadioInline',
      key: 'type',
      templateOptions: {
        label: 'Aufgabenformat',
        options: [{
          name: 'Single-Choice',
          value: 'single'
        },
        {
          name: 'Multiple-Choice',
          value: 'multiple'
        },
        {
          name: 'Eingabe',
          value: 'input'
        }],
        required: true
      }
    },
    {
      key: 'feedback_right',
      type: 'horizontalInput',
      templateOptions: {
        label: 'Feedback (korrekt)',
        placeholder: 'Feedback für korrekte Beantwortung der Aufgabe'
      },
      hideExpression: 'model.type === "multiple"'
    },
    {
      key: 'feedback_wrong',
      type: 'horizontalInput',
      templateOptions: {
        label: 'Feedback (inkorrekt)',
        placeholder: 'Feedback für inkorrekte Beantwortung der Aufgabe'
      },
      hideExpression: 'model.type === "multiple"'
    },
    {
      type: 'repeatSection',
      key: 'choices',
      templateOptions: {
        btnText: 'Antwortoption hinzufügen',
        label: 'Antwortoptionen',
        fields: [
          {
            type: 'horizontalInput',
            key: 'text',
            templateOptions: {
              type: 'text',
              label: 'Antwort',
              placeholder: 'Antwort',
              required: true
            }
          },
          {
            key: 'correct',
            type: 'horizontalCheckbox',
            templateOptions: {
              label: 'Korrekt'
            }
          },
          {
            key: 'feedback',
            type: 'horizontalInput',
            templateOptions: {
              label: 'Elaboriertes Feedback',
              type: 'text',
              placeholder: 'Bei Single-Choice und Eingabe elaboriertes Feedback für diese Antwortoption, bei Multiple-Choice Feedback für korrekt und inkorrekt gewählte Option'
            }
          },
          {
            key: 'feedback_right',
            type: 'horizontalInput',
            templateOptions: {
              label: 'Elaboriertes Feedback (korrekt)',
              type: 'text',
              placeholder: 'Nur für Multiple-Choice, wird bei korrekter Wahl statt obigem Feedback angezeigt'
            }
          },
          {
            key: 'feedback_wrong',
            type: 'horizontalInput',
            templateOptions: {
              label: 'Elaboriertes Feedback (inkorrekt)',
              type: 'text',
              placeholder: 'Nur für Multiple-Choice, wird bei inkorrekter Wahl statt obigem Feedback angezeigt'
            }
          }
        ]
      }
    }];
  }
  static get $inject(){
    return ['tests', '$state', '$stateParams', '$http', '$uibModal'];
  }
}
