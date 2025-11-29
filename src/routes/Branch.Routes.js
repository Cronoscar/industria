import { Router } from "express";
import BranchController from "../controllers/Branch.Controller.js";
const branchRouter = Router();

branchRouter.get('/branches', BranchController.getAllBranches);
branchRouter.post('/branches', BranchController.createBranch);

export default branchRouter;