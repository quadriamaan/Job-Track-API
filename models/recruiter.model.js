import { sequelize } from "../connectDB/sequelize.js";
import { DataTypes } from "sequelize";
import { Company } from "./company.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const Recruiter = sequelize.define('Recruiter',{
    recruiter_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    company_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Company,
            key:'company_id'
        }
    },
    refreshToken:{
        type:DataTypes.STRING,
        allowNull:true
    }
})

Recruiter.addHook('beforeSave',async(recruiter)=>{
    if(recruiter.changed('password')) {
        const salt = await bcrypt.genSalt(10)
        recruiter.password = await bcrypt.hash(recruiter.password,salt)
    }
})

Recruiter.prototype.isPasswordCorrect = async function(enteredPassword) {
 return await bcrypt.compare(enteredPassword,this.password)
}

Recruiter.prototype.generateAccessToken = function() {
   return jwt.sign(
        {
        recruiter_id:this.recruiter_id,
        email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY || "1d"}
    )
}

Recruiter.prototype.generateRefreshToken = function() {
   return jwt.sign(
        {recruiter_id:this.recruiter_id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY || "10d"}
    )
}

export {Recruiter}