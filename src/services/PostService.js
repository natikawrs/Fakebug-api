const { Post, User, Like, Comment } = require("../models");
const friendService = require("./friendService");

exports.findUserPosts = async (userId, include) => {
  let whereUserId = userId;

  if (include === "friend") {
    //select * from posts where user_id in meid, friend1Id, friend2Id.....
    const friendIds = await friendService.findUserFriendIdsByuserId(userId);
    whereUserId = [userId, ...friendIds];
  }

  const posts = await Post.findAll({
    where: { userId: whereUserId },
    attributes: { exclude: "userId" },
    include: [
      { model: User, attributes: { exclude: "password" } },
      { model: Like },
      {
        model: Comment,
        attributes: { exclude: "userId" },
        include: { model: User, attributes: { exclude: "password" } }
      }
    ],
    order: [["updatedAt", "DESC"]]
  });
  return posts;
};
