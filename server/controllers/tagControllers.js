import Tag from "../Models/TagModel.js";
import Post from "../Models/PostModel.js";

export const getAllTags = async (req, res) => {
  try {
    const allTags = await Tag.find().select({ related: 0 });
    if (!allTags) {
      res.status(400).json({
        success: false,
        reason: "Tags not found in database",
      });
    }
    res.status(200).json({
      success: true,
      data: allTags,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: error,
    });
  }
};

export const getTaggedPosts = async (req, res) => {
  try {
    const tag = req.params["tag"];
    const onlytags = req.query.onlytags;
    const sort = req.query.sort;
    let tag_name = tag.charAt(0).toUpperCase() + tag.substring(1).toLowerCase();
    const tagPostIds = (await Tag.findOne({ tag_name }).select({ posts: 1 }))
      .posts;
    if (!tagPostIds) {
      res.status(200).json({
        success: true,
        data: [],
      });
    }
    let taggedPosts = [];
    let allRelatedTags = [];
    for (let i = 0; i < tagPostIds.length; i++) {
      let post = await Post.findById(tagPostIds[i]);
      if (post) {
        taggedPosts.push(post);
        allRelatedTags = [...new Set([...allRelatedTags, ...post.tags])];
      }
    }
    if (sort == "latest") {
      taggedPosts = taggedPosts.reverse();
    } else {
      taggedPosts.sort((a, b) =>
        a.score > b.score ? 1 : b.score > a.score ? -1 : 0
      );
    }
    res.status(200).json({
      success: true,
      data: onlytags == "true" ? allRelatedTags : taggedPosts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: error,
    });
  }
};

export const getTrendingTags = async (req, res) => {
  try {
    const topTags = await Tag.find()
      .select({ tag_name: 1, score: 1 })
      .sort({ score: -1 })
      .limit(10);
    if (!topTags) {
      res.status(400).json({
        success: false,
        reason: "Tags not found in database",
      });
    }
    res.status(200).json({
      success: true,
      data: topTags,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: error,
    });
  }
};

export const getTagData = async (req, res) => {
  try {
    const tag = req.params["tag"];
    let tag_name = tag.charAt(0).toUpperCase() + tag.substring(1);

    const data = await Tag.findOne({ tag_name });

    if (!data) {
      res.status(400).json({
        success: false,
        reason: "Tags not found in database",
      });
    }
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: error,
    });
  }
};

export const autoSaveTags = async (post) => {
  post.tags.forEach(async (tag) => {
    try {
      //capitalizing the tag
      tag = tag.charAt(0).toUpperCase() + tag.substring(1);

      // finding the tag in the database
      let dbTag = await Tag.findOne({ tag_name: tag });

      //creating a object with all new tag data
      let newTag = {};

      if (!dbTag) {
        // if tag is not found then the tag is new hence no union required
        newTag.tag_name = tag;
        newTag.related = [...post.tags];
        newTag.posts = [post._id];
        newTag.score = post.score;

        // creating new tag with the newTag data;
        let createdTag = new Tag(newTag);
        await createdTag.save();
      } else {
        // if the tag exists then the data needs to be updated
        newTag.related = [...new Set([...dbTag.related, ...post.tags])];
        newTag.posts = [...new Set([...dbTag.posts, post._id.toString()])];
        newTag.score =
          (dbTag.score * dbTag.posts.length + post.score) / newTag.posts.length;

        await Tag.updateOne({ _id: dbTag._id }, newTag);
      }
    } catch (error) {
      console.log(error);
    }
  });
};
