import { sequelize } from "../connectDB/sequelize.js";
import { DataTypes } from "sequelize";

const Skill = sequelize.define('Skill',{
    skills_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    skills:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export {Skill}