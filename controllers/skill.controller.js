import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Skill } from "../models/skill.model.js";
import { Job } from "../models/job.model.js";

const createSkill = asyncHandler(async(req,res)=>{
    const {skills,job_id}=req.body

    if(!skills || !job_id) {
        throw new ApiError(400,'all fields are required')
    }

    const job = await Job.findOne({
        where:{
            job_id:job_id
        }
    })

    const createskillDetail = await Skill.create({
        skills
    })

    await createskillDetail.addJob(job)

    return res 
    .status(201)
    .json(new ApiResponse(200,createskillDetail,'skill detail created successfully'))
})

const getSkill = asyncHandler(async(req,res)=>{

  try {
    
      const {id}=req.params
  
      if(!id) {
          throw new ApiError(404,'id is required')
      }
  
      const getSkillbyid = await Skill.findOne({
          where:{
              skills_id:id
          }
      })
  
      return res 
      .status(200)
      .json(new ApiResponse(200,getSkillbyid,'skill fetched successfully'))
  } catch (error) {
    console.error("Error",error.stack)
    throw new ApiError(500,'internal server error')
  }
})

const getAllSkill = asyncHandler(async(req,res)=>{
const getSkills = await Skill.findAll() 
return res 
.status(200) 
.json(new ApiResponse(200,getSkills,'All Skills Fetched successfully'))
})

const updateSkill = asyncHandler(async(req,res)=>{
    const {id} = req.params 
    const {skills} = req.body

    if(!id) {
        throw new ApiError(400,'id is required')
    }

    if(!skills) {
        throw new ApiError(400,'skills are required')
    }

    const findSkill = await Skill.findOne({
        where:{
            skills_id:id
        }
    })

    const updateTheSkill = await Skill.update({
        skills
    },{
        where:{
            skills_id:id
        }
    })

    const updatedSkill = await Skill.findByPk(id)

    return res 
    .status(200)
    .json(new ApiResponse(200,updatedSkill,'skill updated successfully'))

})

const removeSkill = asyncHandler(async(req,res)=>{
    const deleteSkill = await Skill.destroy({
        where:{
            skills_id:id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,deleteSkill,'skill deleted successfully'))
})

export {createSkill,getSkill,getAllSkill,updateSkill,removeSkill}