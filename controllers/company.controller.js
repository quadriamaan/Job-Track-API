import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import { Company } from "../models/company.model.js";

const createCompany = asyncHandler(async(req,res)=>{
    const {name,location}=req.body

    if(!(name || location)) {
        throw new ApiError(400,'all fields are required')
    }

    const companyDetails = await Company.findOne({
        where:{
            name
        }
    })

    // if(!companyDetails) {
    //     throw new ApiError(404,'company details not found')
    // }

    const company = await Company.create({
        name,
        location
    })

    return res 
    .status(201)
    .json(new ApiResponse(200,company,'company registered successfully'))

})

const getAllCompanyDetails = asyncHandler(async(req,res)=>{
    const getAllCompany = await Company.findAll()

    return res 
    .status(200)
    .json(new ApiResponse(200,getAllCompany,'all company fetched successfully'))
})

const getCompanyByid = asyncHandler(async(req,res)=>{
    const {id}=req.params 

    if(!id) {
        throw new ApiError(404,'id is required')
    }

    const company = await Company.findOne({
        where:{
            company_id:id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,company,'company detail fetched successfully'))

})

const updateCompany = asyncHandler(async(req,res)=>{
        const {id}=req.params 
        const {name,location}=req.body

        if(!id) {
            throw new ApiError(404,'id is required')
        }

        if(!(name || location)) {
            throw new ApiError(400,'all fields are required')
        }

        const findCompany = await Company.findOne({
            where:{
                company_id:id
            }
        })

        const updateCompany = await Company.update({
            name,
            location
        },{
            where:{
                company_id:id
            }
        })

        const updatedDetail = await Company.findByPk(id)

        return res 
        .status(200)
        .json(new ApiResponse(200,updatedDetail,'company detai updated successfully'))
})

const deleteCompany = asyncHandler(async(req,res)=>{
    const {id}=req.params

    if(!id) {
        throw new ApiError(400,'id not found')
    }

    const deleteCompanyDetail = await Company.destroy({
        where:{
            company_id:id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,deleteCompanyDetail,'company details deleted successfully'))
})



export {createCompany,getAllCompanyDetails,getCompanyByid,updateCompany,deleteCompany}