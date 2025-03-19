import { sequelize } from "../connectDB/sequelize.js";
import { DataTypes } from "sequelize";
import { Interview } from "./interview.model.js";
import { Job } from "./job.model.js";

const Status = sequelize.define('Status',{
    status_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    interview_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Interview,
            key:'interview_id'
        }
    },
    result:{
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
    }
})

export {Status}