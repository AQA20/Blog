export default (statusCode, data, res) => {
  return res.status(statusCode).json({
    status: 'success',
    statusCode,
    data,
  });
};
