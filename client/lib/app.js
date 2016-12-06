
angular
  .module('FLOKsports', [
    'angular-meteor',
    'ngSanitize',
    'ionic',
    'ion-datetime-picker',
    'ngCordova',
    'pascalprecht.translate',
    'angularMoment'

  ])
  .config(function($ionicConfigProvider) {
    
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    
  })
  .run(function($ionicPickerI18n){
    
    ionic.Platform.ready(function(){
      ionic.Platform.fullScreen(true,true);
    })
    
    $ionicPickerI18n.weekdays = ["Do", "Lu", "Ma", "Mi", "ju", "Vi", "Sá"];
    $ionicPickerI18n.months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    $ionicPickerI18n.ok = "Aceptar";
    $ionicPickerI18n.cancel = "Cancelar";
    $ionicPickerI18n.okClass = "button-positive";
    $ionicPickerI18n.cancelClass = "button-stable";
    
  });


if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}
 
function onReady() {
  angular.bootstrap(document, ['FLOKsports']);
}

