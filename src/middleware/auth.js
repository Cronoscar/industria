import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
/**
 * Middleware de autorización, verifica si el access token es valido o no.
 * Si es valido retorna el token, sino, lanza una excepcion.
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 * @returns 
 */
export function authMiddleware(req, res, next){
    const SECRET = process.env.JWT_SECRET;
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: 'No autorizado' });

    const accessToken = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(accessToken, SECRET);
        req.body = !req.body ? { user: decoded } : { ...req.body, user: decoded };
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError){
            return res.status(403).json({ message: 'Token expirado' });
        }
        return res.status(403).json({ message: `Error al validar el access token: ${error}` });
    }
}

/**
 * Genera el access token y el refresh token para el usuario
 * @param {Object} user - Object describing the current user
 * @returns {Object} Object containing the access and refresh tokens
 */
export function generateTokens(user){
    const ACCESS_TIME_LIMIT = process.env.ACCESS_TOKEN_EXPIRY;
    const REFRESH_TIME_LIMIT = process.env.REFRESH_TOKEN_EXPIRY;
    const SECRET = process.env.JWT_SECRET;

    const payload = {
        id: user.id,
        name: `${user.name} ${user.surname}`
        // isAdmin: user.isAdmin
    }

    const accessToken = jwt.sign(payload, SECRET, { expiresIn: ACCESS_TIME_LIMIT });

    const refreshToken = jwt.sign(payload, SECRET, { expiresIn: REFRESH_TIME_LIMIT });

    return { accessToken, refreshToken};
}
