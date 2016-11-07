App.accessRule("*");
App.accessRule('http://*');
App.accessRule('https://*');


App.info({
  id: 'com.masoft.misreuniones',
  name: 'Mis Reuniones',
  description: 'Reuniones por Adsum',
  author: 'Francisco Mendoza',
  email: 'francisco@masoft.mx',
  website: 'http://masoft.mx',
  version: '0.1',
  buildNumber: '100'
});

App.setPreference('BackgroundColor', '0xff0000ff');

App.configurePlugin('com.phonegap.plugins.facebookconnect', {
    APP_ID: '192169937805189',
    APP_NAME: 'FLOKsports'
});

App.configurePlugin('phonegap-plugin-push', {
  SENDER_ID: 12341234
});

App.icons({
  // iOS
  'iphone': 'resources/icons/icon-60x60.png',
  'iphone_2x': 'resources/icons/icon-60x60@2x.png',
  'iphone_3x': 'resources/icons/icon-60x60@3x.png',

  // Android
  'android_ldpi': 'resources/icons/icon-36x36.png',
  'android_mdpi': 'resources/icons/icon-48x48.png',
  'android_hdpi': 'resources/icons/icon-72x72.png',
  'android_xhdpi': 'resources/icons/icon-96x96.png'
});

App.launchScreens({
  // iOS
	'iphone': 'resources/splash/splash-320x480.png',
  'iphone_2x': 'resources/splash/splash-320x480@2x.png',
  'iphone5': 'resources/splash/splash-320x568@2x.png',
  'iphone6': 'resources/splash/splash-375x667@2x.png',
  'iphone6p_portrait': 'resources/splash/splash-414x736@3x.png',
  // Android
  'android_ldpi_portrait': 'resources/splash/splash-200x320.png',
  'android_mdpi_portrait': 'resources/splash/splash-320x480.png',
  'android_hdpi_portrait': 'resources/splash/splash-480x800.png',
  'android_xhdpi_portrait': 'resources/splash/splash-720x1280.png'
});
