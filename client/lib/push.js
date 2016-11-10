Meteor.startup(function () {
    // The correct way
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