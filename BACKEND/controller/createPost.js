const createPost = async (req, res) => {
  try {
    console.log(req);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      massage: error.massage,
    });
  }
};

module.exports = createPost;
