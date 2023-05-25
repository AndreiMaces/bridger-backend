import HandledRouter from "../utils/HandledRouter";
import registerDevice from "../controller/auth-mobile";

HandledRouter.post("/registerDevice", registerDevice);

export default HandledRouter.getRouter();
