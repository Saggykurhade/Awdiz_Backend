import UserModal from "../Modals/User.modal.js";
import bcrypt from 'bcrypt';

export const Login = async (req,res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(401).json({ success: false, message: "all fields are mandotory..." })

        const user = await UserModal.findOne({ email: email })
        // console.log(user, "user")

        if (!user) return res.status(401).json({ success: false, message: "email is wrong" })

        const isPasscorrect = await bcrypt.compare(password, user.password);
        // console.log(isPasscorrect, "CHECK HERE")

        if (!isPasscorrect) {
            return res.status(401).json({ success: false, message: "Password is wrong" })
        }

        return res.status(200).json({ success: true, message: "Login successfully", user: { name: user.name, id: user._id } })
    } catch {
        return res.status(500).json({ success: false, message: error })
    }
}


export const Register = async (req,res) => {
    try {
        const { name, email, password, number } =req.body;

        if (!name || !email || !password || !number) return res.status(401).json({ success: false, message: "All fields are mandatory..."})

        const user = new UserModal({
            name: name,
            email,
            password,
            number
        })

        await user.save();

        return res.status(200).json({ success: true, message: "Registeration Successfull." })
    
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}


export const getCurrentUser = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(401).json({ success: false, message: "ID is required" })
        const user = await UserModal.findById(id);
        if(!user) return res.status(401).json({success:false,message:"User not found"})

        return res.status(200).json({success:true, user:{name:user.name,id:user._id}})

    } catch (error) {
       return res.status(500).json({success: false,message:"error"})
    }
}