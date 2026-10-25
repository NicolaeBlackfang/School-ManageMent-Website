const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { signSessionToken, sessionCookieOptions } = require('../middleware/auth');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ success: false, message: 'Google token required' });
    }
    
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;
    
    let user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      user = await User.create({
        name,
        email: email.toLowerCase(),
        password: crypto.randomBytes(32).toString('hex'),
        role: 'parent',
        profileImage: picture || ''
      });
    }
    
    res.cookie('token', signSessionToken(user), sessionCookieOptions());
    
    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Google authentication failed' });
  }
};

module.exports = { googleAuth };
