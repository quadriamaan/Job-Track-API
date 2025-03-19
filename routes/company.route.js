import { Router } from "express";
import { createCompany,deleteCompany,getAllCompanyDetails, getCompanyByid, updateCompany } from "../controllers/company.controller.js";

const companyrouter = Router()

companyrouter.route('/').post(createCompany)
companyrouter.route('/').get(getAllCompanyDetails)
companyrouter.route('/:id').get(getCompanyByid)
companyrouter.route('/:id').put(updateCompany)
companyrouter.route('/:id').delete(deleteCompany)


export {companyrouter,getAllCompanyDetails}