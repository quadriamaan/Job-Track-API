import { sequelize } from "./sequelize.js";
import { Company } from "../models/company.model.js";
import { Recruiter } from "../models/recruiter.model.js";
import { Job } from "../models/job.model.js";
import { Interview } from "../models/interview.model.js";
import { Status } from "../models/status.model.js";
import { Skill } from "../models/skill.model.js";
import { job_applicant } from "../models/job_applicant.model.js";
import { Applicant } from "../models/applicant.models.js";

const connectDB = async()=>{
    try {
        await sequelize.authenticate()
        console.log("DB connected")

        Company.hasMany(Recruiter,{foreignKey:'company_id'})
        Recruiter.belongsTo(Company,{foreignKey:'company_id'})

        Recruiter.hasMany(Job,{foreignKey:'recruiter_id'})
        Job.belongsTo(Recruiter,{foreignKey:'recruiter_id'})

        Interview.hasMany(Job,{foreignKey:'job_id'})
        Job.belongsTo(Interview,{foreignKey:'job_id'})

        Interview.hasMany(Status,{foreignKey:'interview_id'})
        Status.belongsTo(Interview,{foreignKey:'interview_id'})

        Job.hasMany(Status,{foreignKey:'job_id'})
        Status.belongsTo(Job,{foreignKey:'job_id'})

        Job.belongsToMany(Skill,{through:'job_skills',foreignKey:'job_id'})
        Skill.belongsToMany(Job,{through:'job_skills',foreignKey:'skills_id'})

        Job.belongsToMany(Applicant,{through:job_applicant,foreignKey:'job_id'})
        Applicant.belongsToMany(Job,{through:job_applicant,foreignKey:'applicant_id'})


        await sequelize.sync({force:false})
    } catch (error) {
        console.log("DB connection failed!!!",error.stack)
    }
} 

export {connectDB}