import getUserId from "../utils/getUserId";

const Query = {
  users: (parent, args, { prisma }, info) => {
    const { first, skip, after, orderBy } = args;
    const opArgs = {
      first,
      skip,
      after,
      orderBy,
      where: { name_contains: args.query },
    };

    return prisma.query.users(opArgs, info); // nothing, string, object
  },
  me: (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request);
    return prisma.query.user({ where: { id: userId } });
  },
};

export default Query;
