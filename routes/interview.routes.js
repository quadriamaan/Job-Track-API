import { Router } from "express";
import { createInterview, deleteInterview, getinterviews, interview, updateInterview } from "../controllers/interview.controller.js";

const interviewrouter = Router() 

interviewrouter.route('/').post(createInterview)
interviewrouter.route('/').get(getinterviews)
interviewrouter.route('/:id').get(interview)
interviewrouter.route('/:id').put(updateInterview)
interviewrouter.route('/:id').delete(deleteInterview)

export {interviewrouter}