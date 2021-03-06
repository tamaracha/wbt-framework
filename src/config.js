import main from './main';
import {types, wrappers} from './formly';

export function config($locationProvider,$compileProvider,$httpProvider,$urlRouterProvider,stateHelperProvider,formlyConfigProvider){
  $locationProvider.html5Mode(true);
  $compileProvider.debugInfoEnabled(false);
  $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
  stateHelperProvider.state(main);
  $urlRouterProvider.otherwise('/home');
  formlyConfigProvider.disableWarnings = true;
  formlyConfigProvider.setWrapper(wrappers);
  formlyConfigProvider.setType(types);
}
config.$inject = ['$locationProvider', '$compileProvider', '$httpProvider', '$urlRouterProvider', 'stateHelperProvider', 'formlyConfigProvider'];

export function run($rootScope,$state,$stateParams, user, PermissionStore, formlyValidationMessages){
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams){
    $rootScope.prevState = fromState;
    $rootScope.prevParams = fromParams;
  });
  $rootScope.$on('$stateChangePermissionDenied',function(event,toState,toParams){
    user.login()
    .result.then(
      () => {
        $state.go(toState.name,toParams);
      },
      () => {
        if($rootScope.prevState.name === ''){
          $state.go('main.home');
        }
      }
    );
  });
  PermissionStore.defineManyPermissions(['anonymous', 'user', 'author'], function(params, role){
    return user.role === role;
  });
  formlyValidationMessages.addStringMessage('json','JSON ist invalid');
  formlyValidationMessages.addTemplateOptionValueMessage('minlength','minlength','Bitte mindestens','Zeichen eingeben');
  formlyValidationMessages.addTemplateOptionValueMessage('maxlength','maxlength','Bitte höchstens','Zeichen eingeben');
  formlyValidationMessages.addTemplateOptionValueMessage('required','label','','ist erforderlich');
  formlyValidationMessages.messages.email = function($viewValue){
    return `${$viewValue} ist keine gültige E-Mail-Adresse`;
  };
}
run.$inject = ['$rootScope', '$state', '$stateParams', 'user', 'PermissionStore', 'formlyValidationMessages'];
