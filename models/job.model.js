import { sequelize } from "../connectDB/sequelize.js";
import { DataTypes } from "sequelize";
import { Recruiter } from "./recruiter.model.js";

const Job = sequelize.define('Job',{
    job_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    requirements:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    expiresIn:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    recruiter_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Recruiter,
            key:'recruiter_id'
        }
    }
})

export {Job}