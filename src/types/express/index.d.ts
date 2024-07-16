// types/express/index.d.ts
import { User } from "../../entity/User";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        iat: number;
        exp: number;
      } | User;
    }
  }
}
