// backend/src/grpc/notificationClient.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Path ke proto file (di luar src)
const PROTO_PATH = path.join(__dirname, '../../grpc/notification.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const notificationProto = grpc.loadPackageDefinition(packageDefinition).notification;

// Create gRPC client (connect ke notification service di port 50051)
const client = new notificationProto.NotificationService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Helper functions
const sendNotification = (data) => {
  return new Promise((resolve, reject) => {
    client.SendNotification(data, (error, response) => {
      if (error) {
        console.error('❌ gRPC SendNotification error:', error.message);
        reject(error);
      } else {
        console.log('✅ Notification sent:', response.message);
        resolve(response);
      }
    });
  });
};

const getUserNotifications = (userId) => {
  return new Promise((resolve, reject) => {
    client.GetUserNotifications({ userId }, (error, response) => {
      if (error) {
        console.error('❌ gRPC GetUserNotifications error:', error.message);
        reject(error);
      } else {
        resolve(response.notifications);
      }
    });
  });
};

const markAsRead = (notificationId) => {
  return new Promise((resolve, reject) => {
    client.MarkAsRead({ notificationId }, (error, response) => {
      if (error) {
        console.error('❌ gRPC MarkAsRead error:', error.message);
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

module.exports = {
  sendNotification,
  getUserNotifications,
  markAsRead
};