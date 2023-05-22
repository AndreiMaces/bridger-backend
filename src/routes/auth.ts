import HandledRouter from "../utils/HandledRouter";
import {
  signup,
  signin,
  confirmEmail,
  resendEmailConfirmation,
  sendEmailForgotPassword,
  resetPassword
} from "../controller/auth";

HandledRouter.post("/register", signup);
HandledRouter.post("/login", signin);
HandledRouter.post("/email-reset-password", sendEmailForgotPassword);
HandledRouter.post("/resend-email-confirmation", resendEmailConfirmation);
HandledRouter.get("/confirm-email/:id", confirmEmail);
HandledRouter.post("/reset-password/:id", resetPassword);

export default HandledRouter.getRouter();
