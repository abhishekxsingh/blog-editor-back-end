const { Blog: BlogService } = require('../../services/customer');

const save = async (req, res) => {
  try {
    const { body, user: { userId } } = req;

    const data = { ...body, createdBy: userId };
    const { doc } = await BlogService.save(data);

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

const patch = async (req, res) => {
  try {
    const { body: data, params: { publicId } } = req;

    const { doc } = await BlogService.patch({ ...data, publicId });

    if (doc) {
      return res.postSuccessfully({});
    }

    return res.postRequest();
  } catch (err) {
    return res.serverError();
  }
};

const getList = async (req, res) => {
  try {
    const { status } = req.query;
    const data = { status };

    const { doc } = await BlogService.getList(data);

    if (doc) {
      return res.getRequest(doc);
    }

    return res.getRequest([]);
  } catch (err) {
    return res.serverError();
  }
};

const getSubmittedList = async (req, res) => {
  try {
    const data = { status: 'submitted' };

    const { doc } = await BlogService.getList(data);

    if (doc) {
      return res.getRequest(doc);
    }

    return res.getRequest(doc);
  } catch (err) {
    return res.serverError();
  }
};

const getDraftedList = async (req, res) => {
  try {
    const data = { status: 'draft' };

    const { doc } = await BlogService.getList(data);

    if (doc) {
      return res.getRequest(doc);
    }

    return res.getRequest(doc);
  } catch (err) {
    return res.serverError();
  }
};

const get = async (req, res) => {
  try {
    const { publicId } = req.query;
    const data = { publicId };
    const { doc } = await BlogService.get(data);

    if (doc) {
      return res.getRequest(doc);
    }

    return res.getRequest();
  } catch (err) {
    return res.serverError();
  }
};

module.exports = {
  save,
  getList,
  getDraftedList,
  getSubmittedList,
  get,
  patch,
};
