const { validationResult } = require('express-validator');


const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};
const handleValidationForSignup = (req, _res, next) =>{
   const validationErrors = validationResult(req);

   if(!validationErrors.isEmpty()){
    const errors = validationErrors
    .array()
    .map((error)=> `${error.msg}`);

    const err = Error('Validation error');
    err.title = 'Validation error';
    err.status = 400;
    err.errors = errors;
    _res.json({
      "message":err.title,
      "statusCode":err.status,
      "errors":err.errors

    })
   }
  //  next();
}

module.exports = {
  handleValidationErrors,
  handleValidationForSignup
};