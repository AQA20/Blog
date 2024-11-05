const existsInDatabase = async (Model, value, helpers, errorMsg) => {
  const record = await Model.findByPk(value);
  if (!record) {
    return helpers.error(errorMsg);
  }
  return value;
};

export { existsInDatabase };
