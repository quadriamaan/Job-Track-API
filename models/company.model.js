import {sequelize} from '../connectDB/sequelize.js'
import { DataTypes } from 'sequelize'

const Company = sequelize.define('Company',{
    company_id:{
       type: DataTypes.INTEGER,
       autoIncrement:true,
       primaryKey:true,
       allowNull:false,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export {Company}