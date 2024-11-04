import ApiError from '../services/ApiError.js';

const softDelete = async (id, model, relationModels) => {
  // Fetch the model from database
  const modelData = await model.findOne({
    where: { id },
    attributes: ['id'],
    include: relationModels.map((relationModel) => ({
      model: relationModel.model,
      attributes: ['id'],
    })),
  });

  // Check if model is not found and throws an error
  if (!modelData) {
    throw new ApiError(`${model} wasn't found`, 404);
  }

  // Check if a relationModel belongs to other models
  const hasRelatedData = relationModels.some(
    // modelData[relationModel.name]? ? to safely access the
    // property so if it was null or undefined, no error will be thrown
    (relationModel) => modelData[relationModel.name]?.length > 1,
  );

  // If model has related data or note
  if (hasRelatedData) {
    return false;
  }

  await modelData.destroy();
  return true;
};

export default softDelete;
