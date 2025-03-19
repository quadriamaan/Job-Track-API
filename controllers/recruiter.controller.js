import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Recruiter } from "../models/recruiter.model.js";


const generateAccessandRefreshToken = async (recruiter) => {
    try {
        if (!recruiter.recruiter_id) {
            throw new ApiError(400, "Recruiter not found");
        }

        // Use Recruiter model, not recruiter instance
        const recruiterdetail = await Recruiter.findOne({
            where: {
                recruiter_id: recruiter.recruiter_id
            }
        });

        if (!recruiterdetail) {
            throw new ApiError(400, "Recruiter not found");
        }

        const accesstoken = recruiterdetail.generateAccessToken();
        const refreshToken = recruiterdetail.generateRefreshToken();

        recruiterdetail.refreshToken = refreshToken;
        await recruiterdetail.save();

        return { accesstoken, refreshToken };
    } catch (error) {
        console.log("error", error.stack);
        throw new ApiError(409, "Error generating tokens");
    }
};


const registerRecruiter = asyncHandler(async(req,res)=>{
    const {name,email,password,phone,company_id}=req.body

    if(!name && !email && !password && !phone && !company_id) {
        throw new ApiError(404,'all fields are required')
    }

    const recruiter = await Recruiter.create({
        name,
        email,
        password,
        phone,
        company_id 
    })

    if(!recruiter) {
        throw new ApiError(404,'recruiter not found')
    }

    return res 
    .status(201)
    .json(new ApiResponse(200,recruiter,'recruiter details created successfully'))
})

const loginRecruiter = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        throw new ApiError(400, "Email and password are required");
    }

    const findPerson = await Recruiter.findOne({
        where: { email: email }
    });

    if (!findPerson) {
        throw new ApiError(404, "Recruiter not found");
    }

    const validPassword = await findPerson.isPasswordCorrect(password);

    if (!validPassword) {
        throw new ApiError(409, "Incorrect password");
    }

    const { accesstoken, refreshToken } = await generateAccessandRefreshToken(findPerson);

    const login = await Recruiter.findOne({
        where: { recruiter_id: findPerson.recruiter_id },
        attributes: { exclude: ["password"] }
    });

    return res.status(200).json(new ApiResponse(200, login, accesstoken, refreshToken, "Recruiter login successful"));
});

const getRecruiter = asyncHandler(async(req,res)=>{
    const {id} = req.params 

    if(!id) {
        throw new ApiError(404,'id not found')
    }

    const recruiter = await Recruiter.findOne({
        where:{
          recruiter_id:id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,recruiter,'recruiter detail fetched successfully'))
})

const getAllRecruiter = asyncHandler(async(req,res)=>{
    const allRecruiter = await Recruiter.findAll() 

    return res 
    .status(200)
    .json(new ApiResponse(200,allRecruiter,'recruiter details fetched successfully'))
})

const updaterecruiter = asyncHandler(async(req,res)=>{
    const {id}=req.params 
    const {email,phone}=req.body

    if(!id) {
    throw new ApiError(404,'id not found')
    }

    if(!(email || phone)) {
        throw new ApiError(404,'all fields are required')
    }

    const findrecruiter = await Recruiter.findOne({
        where:{
            recruiter_id:id
        }
    })

    const updatedetails = await Recruiter.update({
        email,
        phone
    },{
        where:{
            recruiter_id:id
        }
    })

    const recruiterdetails = await Recruiter.findByPk(id)

    return res 
    .status(200)
    .json(new ApiResponse(200,recruiterdetails,'recruiter details updated successfully'))
})

const deleterecruiter = asyncHandler(async(req,res)=>{
    const {id}=req.body 
    
    if(!id) {
        throw new ApiError(404,'id is required')
    }

    const deletedeatils  = await Recruiter.destroy()

    return res. 
    status(200)
    .json(new ApiResponse(200,deletedeatils,'recruiter details deleted successfully'))
})

const logoutRecruiter = asyncHandler(async(req,res)=>{
       const {refreshToken}=req.body 

       if(!refreshToken) {
        throw new ApiError(400,'refreshToken is required ')
       }

       const findrecruiter = await Recruiter.findOne({
        where:{
            refreshToken:refreshToken
        }
       })

       if(!findrecruiter) {
        throw new ApiError(400,'recruiters not found')
       }

       await Recruiter.update({
       refreshToken:null
       },{
        where:{
            recruiter_id:findrecruiter.recruiter_id
        }
       })

       return res
       .status(200)
       .json(new ApiResponse(200,'recruiter logout successfully'))
})



export {registerRecruiter,getRecruiter,getAllRecruiter,updaterecruiter,deleterecruiter,loginRecruiter,logoutRecruiter}