const Tokens = require('csrf');

const csrfAuth = async (req, res, next) => {
    let tokens = new Tokens();
    const csrf_token = req.body['csrf_token'];
    if (tokens.verify(req.session.secret_code, csrf_token)) {
        return next();
    }

    return res.status(401).send({
        error: 'Unauthorized',
        message: 'Authentication failed (csrf).'
    });
};

module.exports = csrfAuth;
