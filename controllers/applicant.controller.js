import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import { Applicant} from "../models/applicant.models.js";
import { job_applicant } from "../models/job_applicant.model.js";
import bcrypt from "bcryptjs";

const generateAccessandRefreshToken = async(applicant)=>{
    try {
        if(!applicant.applicant_id) {
            throw new ApiError(400,'applicant id not found')
        }   
    
        const findApplicant = await Applicant.findOne({
            where:{
                applicant_id:applicant.applicant_id
            }
        })
    
        if(!findApplicant) {
            throw new ApiError(404,'applicant not found')
        }
    
        const accesstoken = await findApplicant.generateAccessToken()
        const refreshToken = await findApplicant.generateRefreshToken()
    
        findApplicant.refreshToken=refreshToken 
    
        await findApplicant.save()

        return {accesstoken,refreshToken}

    } catch (error) {
         console.log('error',error.stack)
    throw new ApiError(409,'error generating tokens')
    }
}

const registerApplicant = asyncHandler(async (req, res) => {
    let { name, email, password, phone, refreshToken ,job_id } = req.body;

    refreshToken = refreshToken && refreshToken.trim() !== "" ? refreshToken : null;


    if (!(name && email && password && phone && job_id)) {
        throw new ApiError(400, "All fields are required");
    }

    if (!req.file) {
        throw new ApiError(400, "Resume file is required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newApplicant = await Applicant.create({
        name,
        email,
        password: hashedPassword,
        phone,
        refreshToken
    });

    await job_applicant.create({
        resume: `/public/temp/${req.file.filename}`, 
        job_id,
        applicant_id: newApplicant.applicant_id  
    });

    return res.status(201).json(new ApiResponse(201, newApplicant, "Applicant registered successfully"));
});

const loginApplicant = asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    if(!(email && password)) {
        throw new ApiError(400,'all fields are required')
    }

    const applicant = await Applicant.findOne({
        where:{
            email
        }
    })

    if(!applicant) {
        throw new ApiError(404,'applicant not found')
    }

    const validPassword = await applicant.isPasswordCorrect(password)

    // if(!validPassword) {
    //     throw new ApiError(409,'incorrect password')
    // }

    const {accesstoken,refreshToken} = await generateAccessandRefreshToken(applicant)

    const login = await Applicant.findOne({
        where:{
            applicant_id:applicant.applicant_id
        },
        attributes:{exclude:["password"]}
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,login,accesstoken,refreshToken,'applicant login successfully'))
})

const getAllApplicant = asyncHandler(async(req,res)=>{
    const getAll=await Applicant.findAll() 

    return res 
    .status(200)
    .json(new ApiResponse(200,getAll,'all applicants fetched successfully'))
})

const getAllApplicantById = asyncHandler(async(req,res)=>{
    const {id}=req.params

    if(!id) {
        throw new ApiError(400,'id is required')
    }

    const findApplicant = await Applicant.findOne({
        where:{
            applicant_id:id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,findApplicant,'applicant fetched successfully '))
})

const updateApplicant = asyncHandler(async(req,res)=>{
    const {id}=req.params 

    if(!id) {
        throw new ApiError(400,'id is required')
    }

    const {name,email,phone,password}=req.body

    if(!(name || email || phone || password)) {
        throw new ApiError(400,'all fields are required')
    }

    const findApplicant = await Applicant.findOne({
        where:{
            applicant_id:id
        }
    })

    const updateApplicant = await Applicant.update({
        name,
        email,
        phone,
        password
    },{
        where:{
            applicant_id:id
        }
    })

    const updatedApplicant = await Applicant.findByPk(id)

    return res 
    .status(200)
    .json(new ApiResponse(200,updatedApplicant,'applicant details updated successfully'))
})

const deleteApplicant = asyncHandler(async(req,res)=>{
    const {id}=req.body 

    if(!id) {
        throw new ApiError(400,'id not found')
    }

    const deleteCandidate = await Applicant.destroy({
     where:{
            applicant_id:id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,deleteCandidate,'Applicant deleted successfully'))
})

const logoutApplicant = asyncHandler(async(req,res)=>{
    const {refreshToken}=req.body

    if(!refreshToken) {
        throw new ApiError(400,'refreshToken is required')
    }

    const findCandidate = await Applicant.findOne({
        where:{
            refreshToken:refreshToken
        }
    })

    if(!findCandidate) {
        throw new ApiError(400,'candidate not found')
    }

    await Applicant.update({
        refreshToken:null
    },{
        where:{
            applicant_id:findCandidate.applicant_id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,'Applicant logout successfully'))

})


export {registerApplicant,loginApplicant,getAllApplicant,getAllApplicantById,updateApplicant,deleteApplicant,logoutApplicant}