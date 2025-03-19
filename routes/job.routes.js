import { Router } from "express";
import {createJob, deleteJob, getAllJob, getJob, updateJob} from '../controllers/job.controller.js'

const jobrouter = Router()

jobrouter.route('/').post(createJob)
jobrouter.route('/:id').get(getJob)
jobrouter.route('/').get(getAllJob)
jobrouter.route('/:id').put(updateJob)
jobrouter.route('/:id').delete(deleteJob)

export {jobrouter}