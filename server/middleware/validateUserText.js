function isHTML(str) {
  return /<\/?[a-z][\s\S]*>/i.test(str);
}

export const validateUserText = (req, res, next) => {
  try {
    const body = req.body;
    if (
      isHTML(body.username) ||
      isHTML(body.name) ||
      isHTML(body.small_intro)
    ) {
      res.status(400).json({
        success: false,
        reason: "Some error occurred",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      reason: "Some error occurred",
    });
  }
};
