const commentService = require("./comment.service");
const { sendResponse } = require("../../utils/response");

// GET COMMENTS
exports.getComments = async (req, res) => {
  try {
    const comments = await commentService.getComments(req.params.id);
    sendResponse(res, 200, "Daftar komentar", comments);
  } catch (err) {
    sendResponse(res, 400, err.message);
  }
};

// POST COMMENT
exports.createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { message } = req.body;

    if (!message) throw new Error("Komentar tidak boleh kosong");

    const comment = await commentService.createComment(id, userId, message);

    sendResponse(res, 201, "Komentar berhasil dibuat", comment);
  } catch (err) {
    sendResponse(res, 400, err.message);
  }
};
