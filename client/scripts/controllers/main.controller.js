angular
  .module('FLOKsports')
  .controller('MainCtrl', function MainCtrl($scope, $reactive, $state, $window) {
  $reactive(this).attach($scope);
 
 
  this.start = function() {
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
		$state.go("anon.login")
  }
  
});