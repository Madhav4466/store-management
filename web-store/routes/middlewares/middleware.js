const WebErrorHandler = require("../../handlers/errorHandler");

const attachUser = (req, res, next) => {
    if (req.session.user_id) {
        res.locals.user = { id: req.session.user_id, name: req.session.userName };
    } else {
        res.locals.user = null;
    }
    next();
}

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        req.session.returnTo = req.originalUrl;
        return res.redirect('/login');
    }
    next();
}

const errorHandler = (fn) => {
    return function(req, res, next){
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}

const errorTypeHandler = (error) => {
    return new WebErrorHandler(`${error.name}: ${error.message}`, 400);
}

module.exports = { errorHandler, errorTypeHandler, requireLogin, attachUser };