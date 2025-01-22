import prisma from "../DB/db.config.js";

export const fetchUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      _count: {
        select: {
          post: true,
          comment: true,
        },
      },
    },
  });
  return res.json({
    status: 200,
    data: users,
    message: "Users fetched successfully",
  });
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const findUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (findUser) {
    return res.json({
      status: 400,
      message: "Email Already Taken. Please another email.",
    });
  }
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  return res.json({
    status: 200,
    data: newUser,
    message: "User created successfully",
  });
};

export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;
  await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  return res.json({
    status: 200,
    message: "User updated successfully",
  });
};

export const showUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
  });
  return res.json({
    status: 200,
    data: user,
    message: "User fetched successfully",
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  return res.json({
    status: 200,
    message: "User deleted successfully",
  });
};
