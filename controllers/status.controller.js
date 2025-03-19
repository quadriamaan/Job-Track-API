import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Status } from "../models/status.model.js";


const createStatus = asyncHandler(async (req, res, next) => {
    try {
        const { interview_id, result, job_id } = req.body;

        if (!interview_id || !result || !job_id) {
            throw new ApiError(400, 'All fields are required');
        }

        const stats = await Status.create({ interview_id, result, job_id });

        return res.status(201).json(new ApiResponse(201, stats, 'Status created successfully'));
    } catch (error) {
        console.error("Error creating status:", error);
        next(error);
    }
});

const getStatus = asyncHandler(async(req,res)=>{
    const {id} = req.params 

    if(!id) {
        throw new ApiError(400,'id required')
    } 

    const getStatusDetail = await Status.findOne({
        where:{
            status_id:id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,getStatusDetail,'Status Fetched successfully'))
})

const getAllStatus = asyncHandler(async(req,res)=>{
    const getStatus = await Status.findAll()

    return res 
    .status(200)
    .json(new ApiResponse(200,getStatus,'all status fetched succesfully'))
})

const updateStatus = asyncHandler(async(req,res)=>{
    const {id}=req.params
    const {interview_id, result, job_id}=req.body

    if(!id) {
        throw new ApiError(400,'id is required')
    } 

    if(!(interview_id || result || job_id)) {
        throw new ApiError(400,'all fields are required')
    }

    const findstatus = await Status.findOne({
        where:{
            status_id:id
        }
    })

    const updateStatus = await Status.update({
        interview_id, 
        result,
         job_id 
    },{
        where:{
            status_id:id
        }
    })

    const statusfind = await Status.findByPk(id) 

    return res 
    .status(200)
    .json(new ApiResponse(200,statusfind,'details updated successfully'))
})

const deleteStatus = asyncHandler(async(req,res)=>{
    const {id}=req.params 

    if(!id) {
        throw new ApiError(400,'id required')
    }

    const removeStatus = await Status.destroy({
        where:{
            status_id:id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,removeStatus,'status removed successfully'))
})

export {createStatus,getStatus,getAllStatus,updateStatus,deleteStatus}