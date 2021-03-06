const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../../model/User");
const Profile = require("../../model/Profile");
const Post = require("../../model/Posts");

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/:post_id
// @desc    Get a single post by id
// @access  Private
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.send(post);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/posts/:post_id
// @desc    Delete a single post by id
// @access  Private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/posts/like/:post_id
// @desc    Like a post
// @access  Private
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // if (!post) {
    //   return res.status(404).json({ msg: "Post not found" });
    // }

    if (
      post.likes.filter((like) => like.user.toString() == req.user.id).length >
      0
    )
      post.likes = post.likes.filter(
        (like) => like.user.toString() !== req.user.id
      );
    else post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/posts/comment
// @desc    Create a cooment
// @access  Private
router.post(
  "/comment/:post_id",
  auth,
  [check("text", "Text is required").not().isEmpty()],
  async (req, res) => {
    // const errors = validationRequest(req);

    // if(!errors.isEmpty()){
    //   return res.status(400).json({errors: errors.array()});
    // }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newCommnet = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      const post = await Post.findById(req.params.post_id);

      post.comments.unshift(newCommnet);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
