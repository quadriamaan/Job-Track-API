import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/temp')
    },
    filename:(req,file,cb)=>{
        const ext = path.extname(file.originalname)
        cb(null,`resume-${Date.now()}${ext}`)
    }
})

export const upload = multer({storage:storage})