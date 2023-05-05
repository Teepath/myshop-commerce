const  bcrypt = require ("bcrypt");
const  jwt= require ("jsonwebtoken");
const  User = require ("../models/User.js");

/* REGISTER USER */
const register = async (req, res) => {

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone
    } = req.body;



    const saltRounds= 10;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    console.log(passwordHash)

    // let passwordHash;

    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //   bcrypt.hash(password, salt, function(err, hash) {
    //     if (err) throw err;
    //     console.log(hash);
        
    //   });
    // });

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      phone
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err, 'err from server')
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({email, password}, 'login');
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    if(err.message ==="E11000 duplicate key error collection"){
      res.status(500).json({ error: "Email already exist" });
    }
    res.status(500).json({ error: err.message });
  }
};


module.exports ={
  register, login
}