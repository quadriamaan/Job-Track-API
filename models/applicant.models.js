import { sequelize } from "../connectDB/sequelize.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const Applicant = sequelize.define('Applicant',{
    applicant_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    refreshToken:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:null
    }
})

Applicant.addHook('beforeSave',async(applicant)=>{
    if(applicant.changed("password")) {
        const salt = await bcrypt.genSalt(10)
        applicant.password = await bcrypt.hash(applicant.password,salt)
    }
})

Applicant.prototype.isPasswordCorrect = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

Applicant.prototype.generateAccessToken = function() {
return jwt.sign(
        {
            applicant_id:this.applicant_id,
            email:this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    )
}

Applicant.prototype.generateRefreshToken = function() {
return jwt.sign(
        {
            applicant_id:this.applicant_id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
}

export {Applicant}