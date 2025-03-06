import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express()
const port = 8001


mongoose.connect("mongodb://127.0.0.1:27017/myuser")
.then(() => console.log("db is created started"))
.catch((err) => console.log(err, "something went wrong"))

const UserSchema = new mongoose.Schema({
    name:{type: String},
    email: {type: String}
})

const Users = mongoose.model("users", UserSchema)

app.use(express.json());
app.use(cors())

app.get('/users',async(req, res)=>{
   const data = await Users.find({});
   return res.json(data)
})

app.post('/users', async(req, res)=>{
    const data = req.body;
    const result = await Users.create({
        name: data?.name,
        email: data?.email
    })
    console.log(result,"new user")
    return res.status(201).json({msg: "user created successfully"});
})

// app.use('/api', useRouter)

app.listen(port, () => {
    console.log("server is running at port:", port)
})