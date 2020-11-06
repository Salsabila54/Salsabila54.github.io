var webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BJHgdABbKLoCcn8ZxOglX0BS6PhPiJGBRgTqLoj2WNuYuWyO1pO8CorulBlVAq2-tqP8mvqu1JgVJidUX5YW17I",
   "privateKey": "zzoY6V_m47TRhRCJHaB8wEx4ghDEc8BQMyZJ45kzFMM"
};


webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eZ4fA8yMjZY:APA91bEGsr3seLn79Si7gJX1bYmxY4Fhu0qhfI3LCK_VprRpaIEyYaRYXsYkq_BvZ8cDs9bkLgQIByC3TYbXj1zRUZ4WMLWXiv4oku-Q_ZJRRQLG-OdaqZgNvUWU0OfwhY9JEqIW9Hbr",
   "keys": {
       "p256dh": "BOe7HB7dE0UvogMkUjd7Bxo/GDcnFWpcX2Lpv490PbhaWcY88cuFBvF9USWb4f6i4NywSamAMfQhWNey4/A5CG4=",
       "auth": "aExtdCz7RshwY0w7yXA1Rg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
   gcmAPIKey: '51247233386',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
