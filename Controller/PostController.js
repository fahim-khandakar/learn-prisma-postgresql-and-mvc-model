import prisma from "../DB/db.config.js";

export const fetchPosts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  if (page <= 0) {
    page = 1;
  }
  if (limit <= 0 || limit > 100) {
    limit = 10;
  }

  const skip = (page - 1) * limit;

  const posts = await prisma.post.findMany({
    skip: skip,
    take: limit,
    include: {
      user: true,
      comment: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  const totalPost = await prisma.post.count();
  const totalPage = Math.ceil(totalPost / limit);

  return res.json({
    status: 200,
    data: posts,
    meta: {
      totalPage,
      limit,
      currentPage: page,
    },
    message: "Posts fetched successfully",
  });
};

export const createPost = async (req, res) => {
  const { user_id, title, description } = req.body;

  const newPost = await prisma.post.create({
    data: {
      user_id: Number(user_id),
      title,
      description,
    },
  });
  return res.json({
    status: 200,
    data: newPost,
    message: "Post created successfully",
  });
};

export const updatePost = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      description,
    },
  });
  return res.json({
    status: 200,
    message: "Post updated successfully",
  });
};

export const showPost = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findFirst({
    where: {
      id: Number(id),
    },
  });
  return res.json({
    status: 200,
    data: post,
    message: "Post fetched successfully",
  });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });
  return res.json({
    status: 200,
    message: "Post deleted successfully",
  });
};

export const searchPost = async (req, res) => {
  const query = req.query.q;
  const posts = await prisma.post.findMany({
    where: {
      description: {
        search: query,
      },
    },
  });
  return res.json({
    status: 200,
    data: posts,
    message: "Posts fetched successfully",
  });
};
