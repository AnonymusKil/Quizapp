import registerModel from "../model/register.js";


async function registerUser(req, res) {
    try{
        const {name, email} = req.body
        const user = await registerModel.findOne({email})
        if(user){
            return res.status(400).json({message: "User already exists already attempt quiz can't attenmpt again"})
        }
        const newUser = new registerModel({
            name,
            email,
        })
       await newUser.save()
       res.status(201).json({message: "User registered successfully"})
       const totalUsers = await registerModel.countDocuments();
       if (totalUsers >= 4) {
            return res.status(400).json({ message: "Registration closed: Maximum number of users reached." });
       }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
export default registerUser