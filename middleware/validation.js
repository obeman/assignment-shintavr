const { getAuth } = require('firebase-admin/auth');

class Middleware {
  async decodeToken(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Unauthorized - Missing or invalid token" });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the token using the Firebase Admin SDK
      const decodedToken = await getAuth().verifyIdToken(token);

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
  }
}

module.exports = new Middleware();