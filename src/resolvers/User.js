import getUserId from "../utils/getUserId";

const User = {
  email: {
    fragment: "fragment userId on User { id }",
    resolve: (parent, args, { request }, info) => {
      const userId = getUserId(request, false);

      if (!userId || userId !== parent.id) return null;

      return parent.email;
    },
  },
};

export default User;
