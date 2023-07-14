/* eslint-disable consistent-return */

const { AdminAuth: AdminAuthService } = require('../../services/admin');

const registration = async (req, res) => {
  try {
    const { doc } = await AdminAuthService.registration(req.body);

    if (doc) {
      return res.send({
        message: 'registration successfull',
      });
    }
  } catch (err) {
    return res.serverError();
  }
};

const login = async (req, res) => {
  try {
    const { doc } = await AdminAuthService.login(req.body);

    if (doc) {
      return res.send({
        ...doc,
        message: 'login successfull',
      });
    }

    return res.unAuthorized();
  } catch (err) {
    return res.serverError();
  }
};
// we are using this for jwt verification after removing bearer token
const verifyJWT = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const response = await AdminAuthService.verifyJWT(authorization);

    if (response) {
      req.user = response;

      return next();
    }

    return res.unAuthorized();
  } catch (err) {
    return res.unAuthorized();
  }
};

const me = async (req, res) => {
  try {
    const data = { email: req.user.email };
    const { doc } = await AdminAuthService.me(data);

    if (doc) {
      return res.getRequest(doc);
    }

    return res.getRequest([]);
  } catch (err) {
    return res.serverError();
  }
};

module.exports = {
  login, registration, me, verifyJWT,
};
