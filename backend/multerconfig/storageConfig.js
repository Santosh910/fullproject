 import multer from "multer";

 const storage = multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,"./uploads")
    },
    filename:(req,file,cb)=>{
       const filename = `image-${Date.now()}.${file.originalname}`
       cb(null,filename)
    }
 })

 //filter
 const filefilter = (req,file,cb)=>{
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
        cb(null,true)
    }else{
        cb(null,false)
        return cb(new Error("only .png .jpg & .jpeg fromatted allowed"))
    }
 }

 export const upload = multer({storage:storage,
   fileFilter:filefilter
}); 