import { Router } from "express";
import { registerApplicant , loginApplicant, getAllApplicant,getAllApplicantById, updateApplicant, deleteApplicant, logoutApplicant} from "../controllers/applicant.controller.js";
import {upload} from "../middleware/multer.middleware.js"


const applicationrouter = Router()

applicationrouter.route('/').post(upload.single("resume"),registerApplicant)
applicationrouter.route('/auth/login').post(loginApplicant)
applicationrouter.route('/').get(getAllApplicant)
applicationrouter.route('/:id').get(getAllApplicantById)
applicationrouter.route('/:id').put(updateApplicant)
applicationrouter.route('/:id').delete(deleteApplicant)
applicationrouter.route('/logout').post(logoutApplicant)

export {applicationrouter}