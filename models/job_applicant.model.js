import { sequelize } from "../connectDB/sequelize.js";
import { DataTypes } from "sequelize";
import {Job} from "../models/job.model.js"
import {Applicant} from "../models/applicant.models.js"

const job_applicant = sequelize.define('job_applicant',{

    resume:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    job_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Job,
            key:'job_id'
        }
    },
    applicant_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Applicant,
            key:'applicant_id'
        }
    }
})

export {job_applicant}