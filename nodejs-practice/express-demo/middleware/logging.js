// my middleware function

function log(req, res, next) {
  console.log('Logging...');
  next();
}

module.exports = log;