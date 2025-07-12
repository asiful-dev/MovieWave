import {Router} from "express"
import protectAdmin from "../middlewares/auth.middleware.js"
import { isAdmin } from "../controllers/admin.controller.js";

const adminRouter=Router();

// adminRouter.use(protectAdmin);
adminRouter.route("/is-admin").get(isAdmin);

export default adminRouter;