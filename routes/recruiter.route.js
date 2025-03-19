import { Router } from "express";
import { registerRecruiter,getRecruiter,getAllRecruiter,updaterecruiter, deleterecruiter, loginRecruiter,logoutRecruiter } from "../controllers/recruiter.controller.js";

const recruiterrouter = Router() 

recruiterrouter.route('/').post(registerRecruiter)
recruiterrouter.route('/auth/login').post(loginRecruiter)
recruiterrouter.route('/:id').get(getRecruiter)
recruiterrouter.route('/').get(getAllRecruiter)
recruiterrouter.route('/:id').put(updaterecruiter)
recruiterrouter.route('/:id').delete(deleterecruiter)
recruiterrouter.route('/logout').post(logoutRecruiter)

export {recruiterrouter}