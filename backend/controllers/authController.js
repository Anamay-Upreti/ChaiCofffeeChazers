import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) return;
    res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      email,
      password: hashed,
    });

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// for login 


export const loginUser = async (req, res) =>{
    const {email, password} = req.body;

    try{
    const user = await User.findOne({email});    
    if(!user) return res.status(400).json({
        message: "User does not exist"
    })
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({
        message: "Invalid credentials"
    })

    res.json({
        token: generateToken(user._id),
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
        },
    });
} catch(err){
    res.status(500).json({message: err.message});
}
}


//for auth user
export const getUser = async (req, res) =>{
    res.json(req.user);
}

//logout 

export const logout = async (req,res) =>{
    res.json({
        message: "Logged out"
    })
}