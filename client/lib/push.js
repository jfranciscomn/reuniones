Meteor.startup(function () {
    // The correct way
    Push.Configure({
      android: {
        senderID: 510365416868,
        alert: true,
        badge: true,
        sound: true,
        vibrate: true,
        clearNotifications: true
        // icon: '',
        // iconColor: ''
      },
      ios: {
        badge: true,
        sound: true,
        alert: true,
        vibrate: true
      },
      badge: true,
      sound: true,
      alert: true,
      vibrate: true
    });
    
    Push.allow({
       	send: function(userId, notification) {
          // Allow all users to send to everybody - For test only!
          return true;
        }
    });


});