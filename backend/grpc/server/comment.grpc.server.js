const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const prisma = require("../../src/config/prisma");

const PROTO_PATH = __dirname + "/../proto/comment.proto";

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDef);
const commentPackage = grpcObj.comment;

async function createComment(call, callback) {
  const { ticketId, userId, content } = call.request;

  const data = await prisma.comment.create({
    data: { ticketId, userId, content }
  });

  callback(null, data);
}

async function getComments(call, callback) {
  const { ticketId } = call.request;

  const data = await prisma.comment.findMany({
    where: { ticketId },
  });

  callback(null, { comments: data });
}

function main() {
  const server = new grpc.Server();
  server.addService(commentPackage.CommentService.service, {
    CreateComment: createComment,
    GetComments: getComments,
  });

  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => server.start()
  );

  console.log("gRPC Comment Service running on port 50051");
}

main();
