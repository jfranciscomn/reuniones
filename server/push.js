Meteor.startup(function () {
    
    Push.Configure({
        gcm: {
            apiKey: 'AIzaSyAHBAZDKIzySO7r9hbJhPO4O9dMtjkjGQI',
            projectNumber: 510365416868
        },
        apn: {
            // setting this on client throws security error
            passphrase: 'pelicano',
            // pem files are placed in the app private folder
            certData: Assets.getText('pushdevelopcert.pem'),
            keyData: Assets.getText('pushdevelopkey.pem'),
            gateway: "gateway.sandbox.push.apple.com"
        },
        production: false, // use production server or sandbox
        badge: true,
        sound: true,
        alert: true,
        vibrate: true
    });  
    Push.debug=true;
  });

Meteor.methods({
    pushUserRegister: function (userId, appId) {
        var pushUser=PushUsers.findOne({appId:appId});
        if(pushUser){
            PushUsers.update({appId:appId},{$set:{userId:userId}});
        }
        else{
            PushUsers.insert({userId:userId,appId:appId});
        }
    }
    
});