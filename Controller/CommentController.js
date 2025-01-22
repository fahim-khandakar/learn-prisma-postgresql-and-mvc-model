import prisma from "../DB/db.config.js";

export const fetchComments = async (req, res) => {
  const comments = await prisma.comment.findMany({
    include: {
      user: true,
      post: {
        include: {
          user: true,
        },
      },
    },
  });
  return res.json({
    status: 200,
    data: comments,
    message: "Comments fetched successfully",
  });
};

export const createComment = async (req, res) => {
  const { user_id, post_id, comment } = req.body;

  // * Increase the comment count
  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comments_count: {
        increment: 1,
      },
    },
  });

  const newComment = await prisma.comment.create({
    data: {
      user_id: Number(user_id),
      post_id: Number(post_id),
      comment,
    },
  });
  return res.json({
    status: 200,
    data: newComment,
    message: "Comment created successfully",
  });
};

export const updateComment = async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;
  await prisma.comment.update({
    where: {
      id: Number(id),
    },
    data: {
      comment,
    },
  });
  return res.json({
    status: 200,
    message: "Comment updated successfully",
  });
};

export const showComment = async (req, res) => {
  const { id } = req.params;
  const comment = await prisma.comment.findFirst({
    where: {
      id: Number(id),
    },
  });
  return res.json({
    status: 200,
    data: comment,
    message: "Comment fetched successfully",
  });
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  // * Decrement the comment count
  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comments_count: {
        decrement: 1,
      },
    },
  });

  await prisma.comment.delete({
    where: {
      id: Number(id),
    },
  });
  return res.json({
    status: 200,
    message: "Comment deleted successfully",
  });
};
