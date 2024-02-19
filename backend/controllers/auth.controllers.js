import UserModel from '../modals/User.model.js'
import moment from 'moment'

export const Register =async(req,res)=>{
    try {
    const file = req.file.filename;
    const {fname,lname,email,mobile,gender,location,status} =req.body;

    if(!fname || !lname || !email || !mobile || !gender || !location || !status || !file){
         res.status(401).json("All Inputs is required")
    }
   
        const peruser = await UserModel.findOne({email:email});

        if(peruser){
             res.status(401).json("this user is aleready exist in our database")
        }else{

            const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")

            const userData = new UserModel({
                fname,lname,email,mobile,gender,location,status,profile:file,datecreated
            });
             await userData.save();
             res.status(200).json(userData)
        }
    } catch (error) {
         res.status(500).json({success:false,message:error})
    }
    
   
}

//userget

export const Userget=async(req,res)=>{

    const search = req.query.search || ""
    const gender = req.query.gender || ""
    const status = req.query.status || ""

    const query = {
        fname:{$regex:search,$options :"i"}
    }
       if(gender !== "All"){
        query.gender = gender 
          
       }
       if(status !== "All"){
        query.status = status
     }

    try {
        console.log(req.query)
        const usersdata = await UserModel.find(query )
        return res.status(200).json(usersdata)
    } catch (error) {
        res.status(500).json(error)
    }
}

 export const Singleuserget = async (req,res)=>{
    const {id} =req.params;

    try {
        const userdata = await UserModel.findOne({_id:id});
        res.status(200).json(userdata)
    } catch (error) {
        res.status(500).json(error)
    }
 }

 export const useredit = async (req,res)=>{
    const {id} = req.params;
    const {fname,lname,email,mobile,gender,location,status,user_profile} = req.body;
    const file = req.file ? req.file.filename : user_profile;

    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    try {
        const updateuser = await UserModel.findByIdAndUpdate({_id:id},{
            fname,lname,email,mobile,gender,location,status,profile:file,dateUpdated
        },{
            new:true
        })
        await updateuser.save();
        res.status(200).json(updateuser)
    } catch (error) {
        res.status(500).json(error)
    }
 }

 export const userdelete = async(req,res)=>{
    const {id} = req.params;
    try {
        const deleteuser = await UserModel.findByIdAndDelete({_id:id});
        res.status(200).json(deleteuser)
    } catch (error) {
        res.status(500).json(error)
    }
 }

 export const userstatus = async (req,res)=>{
       const {id} = req.params;
       const {data}= req.body;

       try {
           const userstatusupdate = await userdelete.findByIdAndUpdate({_id:id},{status:data},{new:true})
           res.status(200).json(userstatusupdate)
       } catch (error) {
        res.status(500).json(error)
       }
 }