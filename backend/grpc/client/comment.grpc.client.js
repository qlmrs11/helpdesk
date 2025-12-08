const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + "/../proto/comment.proto";

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDef);
const CommentService = grpcObj.comment.CommentService;

module.exports = new CommentService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
