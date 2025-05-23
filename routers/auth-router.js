const router = require('express').Router();
const { asyncHandler } = require('../utils/async-handler');
const { validator } = require('../validation/validator');
const {
  userSignupValidationSchema,
  userLoginValidationSchema
} = require('../validation/auth-validation');
const {
  signup,
  login,
  logout,
  protect,
  authenticateRefreshToken,
  generateAccessToken
} = require('../controllers/auth-controller');

router.post(
  '/signup',
  validator(userSignupValidationSchema),
  asyncHandler(signup)
);

router.post(
  '/login',
  validator(userLoginValidationSchema),
  asyncHandler(login)
);

router.post(
  '/token',
  asyncHandler(authenticateRefreshToken),
  asyncHandler(generateAccessToken)
);

router.get('/logout', asyncHandler(protect), asyncHandler(logout));

module.exports = router;
