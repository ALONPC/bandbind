const errorHelper = (err, res, status, msg) => {
  if (err) {
    return res.status(status).json({
      error: `${msg}, Full error: ${err}`,
    });
  }
};

module.exports = errorHelper;
