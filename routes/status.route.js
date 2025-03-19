import { Router } from "express";
import { createStatus, getAllStatus, getStatus, updateStatus, deleteStatus } from "../controllers/status.controller.js";

const statusrouter = Router() 

statusrouter.route('/').post(createStatus)
statusrouter.route('/:id').get(getStatus)
statusrouter.route('/').get(getAllStatus)
statusrouter.route('/:id').put(updateStatus)
statusrouter.route('/:id').delete(deleteStatus)

export {statusrouter}