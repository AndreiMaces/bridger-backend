import { getAllUsers, getUserById, deleteUser, updateUser, changeUserRole} from "../controller/user";
import isAdmin from "../middleware/isAdmin";
import hasPermissionToUpdateUser from "../middleware/updateUserPermission";
import HandledRouter from "../utils/HandledRouter";

HandledRouter.get("/", isAdmin, getAllUsers);
HandledRouter.get("/:id", hasPermissionToUpdateUser , getUserById);
HandledRouter.patch("/:id/role", isAdmin, changeUserRole);
HandledRouter.patch("/:id/email" , hasPermissionToUpdateUser ,updateUser);
HandledRouter.put("/:id", hasPermissionToUpdateUser ,updateUser);
HandledRouter.delete("/:id",isAdmin , deleteUser);

export default HandledRouter.getRouter();
