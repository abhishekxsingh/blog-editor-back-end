const { Role: RoleService } = require('../../services/admin');

const save = async (req, res) => {
  try {
    const { body, user: { userId } } = req;

    const data = { ...body, createdBy: userId };
    const { doc } = await RoleService.save(data);

    if (doc) {
      const { publicId } = doc;

      res.setHeader('public-id', publicId);

      return res.postRequest(doc);
    }

    return res.postRequest();
  } catch (err) {
    return res.serverError();
  }
};

module.exports = {
  save,
};
