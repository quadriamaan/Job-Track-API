import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Job } from "../models/job.model.js";

const createJob = asyncHandler(async(req,res)=>{

    const {role,description,requirements,expiresIn,recruiter_id}=req.body

    if(!(role || description || requirements || expiresIn || recruiter_id)) {
        throw new ApiError(404,'all fields are required')
    }

    const jobdetails = await Job.create({
        role,
        description,
        requirements,
        expiresIn,
        recruiter_id
    })

    return res 
    .status(201)
    .json(new ApiResponse(200,jobdetails,'job details created successfully'))
})

const getJob = asyncHandler(async(req,res)=>{
    const {id}=req.params 

    if(!id) {
        throw new ApiError(404,'id is required')
    }

    const getjobdetail = await Job.findOne({
        where:{
           job_id:id 
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,getjobdetail,'jobdetail fetched successfully'))
})

const getAllJob = asyncHandler(async(req,res)=>{
    const getJobs = await Job.findAll()

    return res 
    .status(200)
    .json(new ApiResponse(200,getJobs,'all jobs fetched successfully'))
})

const updateJob = asyncHandler(async(req,res)=>{
    const {id}=req.params
    const {role,description,requirements,expiresIn}=req.body

    if(!id) {
        throw new ApiError(400,'id is required')
    }

    if(!(role || description || requirements || expiresIn)) {
        throw new ApiError(404,'all fields are required')
    }

    const jobdetail = await Job.findOne({
        where:{
            job_id:id
        }
    })

    const updatejobdetail = await Job.update({
        role,
        description,
        requirements,
        expiresIn 
    }, {
        where:{
            job_id:id
        }
    })

    const findjobdetail = await Job.findByPk(id)

    return res 
    .status(200)
    .json(new ApiResponse(200,findjobdetail,'job details updated successfully'))
})  

const deleteJob = asyncHandler(async(req,res)=>{
    const {id}=req.params 

    if(!id) {
        throw new ApiError(400,'id is required')
    }

    const deleteJobDetail = await Job.destroy({
        where:{
            job_id:id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,deleteJobDetail,'job details deleted successfully'))
})

export {createJob,getJob,getAllJob,updateJob,deleteJob}