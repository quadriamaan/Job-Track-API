import express from 'express' 
import cookieParser from 'cookie-parser'
import { companyrouter } from './routes/company.route.js'
import { recruiterrouter } from './routes/recruiter.route.js'
import { jobrouter } from './routes/job.routes.js'
import { interviewrouter } from './routes/interview.routes.js'
import { statusrouter } from './routes/status.route.js'
import { skillrouter } from './routes/skill.route.js'
import { applicationrouter } from './routes/applicant.routes.js'

const app=express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/v2/company',companyrouter)
app.use('/api/v2/recruiter',recruiterrouter)
app.use('/api/v2/job',jobrouter)
app.use('/api/v2/interview',interviewrouter)
app.use('/api/v2/status',statusrouter)
app.use('/api/v2/skill',skillrouter)
app.use('/api/v2/applicant',applicationrouter)

export {app}