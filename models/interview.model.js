import { sequelize } from "../connectDB/sequelize.js";
import { DataTypes } from "sequelize";
import { Job } from "./job.model.js";

const Interview = sequelize.define('Interview',{
    interview_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    Date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    schedule:{
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

export {Interview}