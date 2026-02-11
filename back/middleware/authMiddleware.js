const jwt = require('jsonwebtoken');

const VALID_ROLES = ['tex', 'gexp', 'exp', 'part'];

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Токен не предоставлен',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Неправильный или истекший токен',
      error: error.message,
    });
  }
};

exports.checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const { role } = req.user;

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: `У вас нет прав доступа к этому ресурсу. Требуемые роли: ${allowedRoles.map(getRoleName).join(', ')}`,
      });
    }

    next();
  };
};
