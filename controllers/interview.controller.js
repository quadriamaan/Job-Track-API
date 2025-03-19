import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Interview } from "../models/interview.model.js";

const createInterview = asyncHandler(async(req,res)=>{
    const {schedule,Date,job_id}=req.body

    if(!(schedule || Date || job_id)) {
        throw new ApiError(400,'all fields are required')
    }

    const interview = await Interview.create({
        schedule,
        Date,
        job_id
    })

    return res 
    .status(201)
    .json(new ApiResponse(200,interview,'interview details created successfully'))
})

const getinterviews = asyncHandler(async(req,res)=>{
    const interviews = await Interview.findAll()
    return res 
    .status(200)
    .json(new ApiResponse(200,interviews,'all interviews fetched successfully'))
})

const interview = asyncHandler(async(req,res)=>{
    const {id}=req.params

    if(!id) {
        throw new ApiError(400,'id not found')
    }

    const interviewdetail = await Interview.findOne({
        where:{
            interview_id:id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,interviewdetail,'interview detail fetched successfully'))
})

const updateInterview = asyncHandler(async(req,res)=>{
    const {id} = req.params 
    const {Date,schedule} = req.body

    if(!id) {
        throw new ApiError(400,'id not found')
    } 

    if(!(Date || schedule)) {
        throw new ApiError(400,'all fields are required')
    }

    const interviewdetail = await Interview.findOne({
        where:{
            interview_id:id
        }
    })

    const updateinterview = await Interview.update({
        Date,
        schedule
    },{
        where:{
            interview_id:id
        }
    })

    const updatedInterview = await Interview.findByPk(id)

    return res 
    .status(200)
    .json(new ApiResponse(200,updatedInterview,'interview details updated successfully'))
})

const deleteInterview = asyncHandler(async(req,res)=>{
    const {id}=req.params 

    const interviewdelete = await Interview.destroy({
        where:{
            interview_id:id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,interviewdelete,'interview details deleted successfully'))
})

export {createInterview,getinterviews,interview,updateInterview,deleteInterview}