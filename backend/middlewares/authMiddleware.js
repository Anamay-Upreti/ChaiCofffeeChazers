import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) =>{
    const auth = req.headers.authorization;
    if(!auth || !auth.starts.With('Bearer'))
        return res.status(401).json({message: "Unauthorized"});

    try{
        const decoded = jwt.verify(auth.split('')[1], process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch(err){
        res.status(401).json({message: "Invalid Token"});
    }
};

export default protect;