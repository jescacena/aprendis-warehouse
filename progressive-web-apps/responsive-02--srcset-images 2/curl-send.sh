curl -X POST -H "Authorization: key=AAAAnCuzWaQ:APA91bGjGUGGz8TiiKr5B60b8v5lVaRTEDwxw40iaa6phJYLY_yFb3R8UGVne3T1itRsVfrNjZJ-8wCvRSRmg00CST2OHGrx_JOLO5UhnhcQ69syZ_Rh3pJw72cBkjWuXkER0NyXex5g" -H "Content-Type: application/json" -d '{
  "notification": {
    "title": "Portugal vs. Denmark",
    "body": "5 to 1",
  },
  "to": "eMVUAYII5JkuQ4cwfemLvy:APA91bFoLLH3uUFywaZwQVQb--BALGdVaAyOoH9u8fGmCC2IsMiwByIZNxKiQjqZdm3nxDYX2id9MgbdKf7kHyPuGqzXzBKkTub8iiC1MOXQuoNa_oDky-FdtrD4SGnEZZigE5rPRTGV"
}' "https://fcm.googleapis.com/fcm/send"    