import generateJwtToken from "../utils/generateJwtToken";
import getUserId from "../utils/getUserId";
import hashPassword from "../utils/hashPassword";
import bcrypt from "bcrypt";

const Mutation = {
  createUser: async (parent, args, { prisma }, info) => {
    const password = await hashPassword(args.data.password);

    const user = await prisma.mutation.createUser({
      data: { ...args.data, password },
    });

    return {
      user,
      token: generateJwtToken(user.id),
    };
  },
  login: async (parent, args, { prisma }, info) => {
    const { email, password } = args.data;
    const user = await prisma.query.user({ where: { email } });
    if (!user) throw new Error("Unable to login");
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new Error("Unable to login");

    return {
      user,
      token: generateJwtToken(user.id),
    };
  },
  deleteUser: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request);
    return prisma.mutation.deleteUser({ where: { id: userId } }, info);
  },
  updateUser: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request);

    if (!!args.data.password) {
      args.data.password = await hashPassword(args.data.password);
    }
    return prisma.mutation.updateUser({ data: args.data, where: { id: userId } }, info);
  },
};

export default Mutation;
