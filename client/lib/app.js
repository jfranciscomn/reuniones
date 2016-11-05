
angular
  .module('FLOKsports', [
    'angular-meteor',
    'ngSanitize',
    'ionic',
    'angularMoment'

  ])
  .config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
	})
	;

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}
 
function onReady() {
  angular.bootstrap(document, ['FLOKsports']);

}


