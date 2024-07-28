import {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

PushNotification.createChannel(
  {
    channelId: 'channel-id', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created: any) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);
const ForegroundNotificationController = () => {
  useEffect(() => {
    // PushNotification.getChannels(function (channel_ids) {
    //   console.log(channel_ids); // ['channel_id_1']
    // });
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      PushNotification.localNotification({
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage.notification.android.imageUrl,
        smallIcon: remoteMessage.notification.android.imageUrl,
        // channelId: remoteMessage.notification.android.channelId,
        channelId: true,
        vibrate: true,
      });
    });
    return unsubscribe;
  }, []);
  return null;
};
export default ForegroundNotificationController;
