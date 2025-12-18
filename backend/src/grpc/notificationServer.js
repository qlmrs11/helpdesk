const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const prisma = require('../config/prisma');

const PROTO_PATH = path.join(__dirname, '../../grpc/notification.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const notificationProto = grpc.loadPackageDefinition(packageDefinition).notification;

let ioInstance = null;

function setSocketIO(io) {
  ioInstance = io;
}

async function SendNotification(call, callback) {
  try {
    const { userId, type, title, message, ticketId, metadata } = call.request;

    console.log(`📨 [gRPC] Sending notification to user ${userId}: ${title}`);

    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        ticketId: ticketId || null,
        metadata: metadata || null,
        isRead: false
      }
    });

    if (ioInstance) {
      const notifData = {
        id: notification.id,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        ticketId: notification.ticketId,
        isRead: notification.isRead,
        createdAt: notification.createdAt.toISOString()
      };

      ioInstance.to(`user_${userId}`).emit('new_notification', notifData);
      console.log(`✅ [WebSocket] Notification broadcast to user ${userId}`);
    }

    callback(null, {
      success: true,
      message: 'Notification sent successfully',
      notificationId: notification.id
    });
  } catch (error) {
    console.error('❌ [gRPC] Error sending notification:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
}

async function GetUserNotifications(call, callback) {
  try {
    const { userId } = call.request;

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    callback(null, {
      notifications: notifications.map(n => ({
        id: n.id,
        userId: n.userId,
        type: n.type,
        title: n.title,
        message: n.message,
        ticketId: n.ticketId,
        isRead: n.isRead,
        createdAt: n.createdAt.toISOString()
      }))
    });
  } catch (error) {
    console.error('❌ [gRPC] Error getting notifications:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
}

async function MarkAsRead(call, callback) {
  try {
    const { notificationId } = call.request;

    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    });

    callback(null, {
      success: true,
      message: 'Notification marked as read',
      notificationId
    });
  } catch (error) {
    console.error('❌ [gRPC] Error marking as read:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: error.message
    });
  }
}

function startGrpcServer() {
  const server = new grpc.Server();
  
  server.addService(notificationProto.NotificationService.service, {
    SendNotification,
    GetUserNotifications,
    MarkAsRead
  });

  server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error('❌ Failed to start gRPC Notification Server:', error);
        return;
      }
      console.log(`🚀 gRPC Notification Server running on port ${port}`);
    }
  );

  return server;
}

module.exports = { 
  startGrpcServer,
  setSocketIO
};