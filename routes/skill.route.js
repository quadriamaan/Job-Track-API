import { Router } from "express";
import { createSkill,getAllSkill,getSkill, removeSkill, updateSkill } from "../controllers/skill.controller.js";

const skillrouter = Router()

skillrouter.route('/').post(createSkill)
skillrouter.route('/:id').get(getSkill)
skillrouter.route('/').get(getAllSkill)
skillrouter.route('/:id').put(updateSkill)
skillrouter.route('/:id').delete(removeSkill)

export {skillrouter}