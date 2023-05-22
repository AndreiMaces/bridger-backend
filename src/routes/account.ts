import { deleteAccount } from "../controller/account";
import HandledRouter from "../utils/HandledRouter";

HandledRouter.delete("/", deleteAccount);

export default HandledRouter.getRouter();