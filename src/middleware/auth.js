import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    console.log('req.user', req.user);
    if (req.user && req.user.user_level_id == 1) {
        next();
    } else {
        res.status(403).json({ message: 'Pääsy evätty' });
    }
};

export { authenticateToken, isAdmin };