
angular
  .module('FLOKsports', [
    'angular-meteor',
    'ngSanitize',
    'ionic',
    'ion-datetime-picker',
    'timer',
    'ngCordova',
    'pascalprecht.translate',
    'angularMoment',
    'ionic-color-picker',
    'ngTagsInput'

  ])
  .config(function($ionicConfigProvider) {
    
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    
  })
  .run(function($ionicPickerI18n,$translate){
    
    ionic.Platform.ready(function(){
      ionic.Platform.fullScreen(true,true);
    })
    $ionicPickerI18n.weekdays = ["Do", "Lu", "Ma", "Mi", "ju", "Vi", "Sá"];
    $ionicPickerI18n.months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    $ionicPickerI18n.ok = "Aceptar";
    $ionicPickerI18n.cancel ="Cancelar";

    $translate('WEEKDAYS').then(
      function (translation) {
        //console.log('1',translation);
        $ionicPickerI18n.weekdays = translation.split(",")
      }, function (translationId) {
        //console.log('2',translationId);
      }
    );

    $translate('MONTHS').then(
      function (translation) {
        //console.log('1',translation);
        $ionicPickerI18n.months = translation.split(",")
      }, function (translationId) {
        //console.log('2',translationId);
      }
    );

    $translate('OK').then(
      function (translation) {
        //console.log('1',translation);
        $ionicPickerI18n.ok = translation
      }, function (translationId) {
        //console.log('2',translationId);
      }
    );

    $translate('CANCEL').then(
      function (translation) {
        //console.log('1',translation);
        $ionicPickerI18n.cancel = translation
      }, function (translationId) {
        //console.log('2',translationId);
      }
    );

    
    
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

