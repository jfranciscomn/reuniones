
angular
  .module('FLOKsports', [
    'angular-meteor',
    'ngSanitize',
    'ionic',

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
    Push.Configure({
      android: {
        senderID: 12341234,
        alert: true,
        badge: true,
        sound: true,
        vibrate: true,
        clearNotifications: true
        // icon: '',
        // iconColor: ''
      },
      ios: {
        alert: true,
        badge: true,
        sound: true
      }
    });
     Push.allow({
        send: function(userId, notification) {
          // Allow all users to send to everybody - For test only!
          return true;
        }
      });
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