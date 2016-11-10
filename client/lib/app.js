
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

  .run(function(){
    ionic.Platform.ready(function(){

      ionic.Platform.fullScreen();
    })
    
  });


if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}
 
function onReady() {
  angular.bootstrap(document, ['FLOKsports']);
  console.log(navigator.globalization);

}