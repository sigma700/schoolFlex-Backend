import { Router } from "express";
import {
  findSchool,
  findSchoolExact,
  getSChoolByid,
  getSchools,
} from "../../controllers/schoolController.js";

export const schoolRouter = Router();

schoolRouter.get("/schools/search", findSchool);
schoolRouter.get("/schools/search-exact", findSchoolExact);
schoolRouter.get("/schools", getSchools);
schoolRouter.get("/schools/:id", getSChoolByid);
