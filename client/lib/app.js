
angular
  .module('FLOKsports', [
    'angular-meteor',
    'ngSanitize',
    'ionic',
<<<<<<< HEAD
    'angularMoment',
    'ngCordova',
    'pascalprecht.translate'
=======
    'angularMoment'
>>>>>>> 4d6470212e89e3d57d67978f880dfb6eeb78412e

  ])
  .config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
	})
	.run(function(){
    ionic.Platform.ready(function(){

      ionic.Platform.fullScreen(true,true);
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

}


