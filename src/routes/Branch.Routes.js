import { Router } from "express";
import BranchController from "../controllers/Branch.Controller.js";
const branchRouter = Router();

branchRouter.get('/branches', BranchController.getAllBranches);
branchRouter.post('/branches', BranchController.createBranch);
branchRouter.get('/branches/search/:name', BranchController.searchBranchesByName);
branchRouter.get('/branches/search/:categoryID', BranchController.getBranchesByCategory);
branchRouter.get('/branches/:id', BranchController.getBranchById);
export default branchRouter;