const prisma = require("../../config/prisma");

exports.getUserNotifications = async (userId, limit = 50) => {
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      ticket: {
        select: {
          id: true,
          title: true,
          status: true
        }
      }
    }
  });

  return notifications;
};

exports.getUnreadCount = async (userId) => {
  const count = await prisma.notification.count({
    where: { 
      userId,
      isRead: false
    }
  });

  return count;
};

exports.markAsRead = async (notificationId) => {
  await prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true }
  });
};

exports.markAllAsRead = async (userId) => {
  await prisma.notification.updateMany({
    where: { 
      userId,
      isRead: false
    },
    data: { isRead: true }
  });
};