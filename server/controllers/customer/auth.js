/* eslint-disable consistent-return */

const { CustomerAuth: AuthService } = require('../../services/customer');

const registration = async (req, res) => {
  const { doc } = await AuthService.registration(req.body);

  if (doc) {
    return res.send({
      message: 'registration successfull',
    });
  }
};

const login = async (req, res) => {
  const { doc } = await AuthService.login(req.body);

  if (doc) {
    return res.send({
      ...doc,
      message: 'login successfull',
    });
  }

  return res.notFound();
};
// we are using this for jwt verification after removing bearer token
const verifyJWT = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { doc } = await AuthService.verifyJWT(authorization);

    if (doc) {
      req.user = doc;

      return next();
    }

    return res.unAuthorized();
  } catch (err) {
    return res.serverError();
  }
};

const me = async (req, res) => {
  try {
    const data = { email: req.user.email };
    const { doc } = await AuthService.me(data);

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
