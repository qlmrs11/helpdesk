// src/modules/comment/service.controller.js
const grpc = require("../../config/grpc");

exports.createComment = (userId, ticketId, content) => {
  return new Promise((resolve, reject) => {
    grpc.CreateComment({ userId, ticketId, content }, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

exports.getComments = (ticketId) => {
  return new Promise((resolve, reject) => {
    grpc.GetComments({ ticketId }, (err, res) => {
      if (err) return reject(err);
      resolve(res.comments);
    });
  });
};
