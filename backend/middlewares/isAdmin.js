const adminOnly = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "Admin access only" }); // 403 is more appropriate than 401 here
    }
  };
  
  export default adminOnly;
  