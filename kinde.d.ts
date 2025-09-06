import { KindeUser as OriginalKindeUser } from "@kinde-oss/kinde-auth-nextjs";

declare module "@kinde-oss/kinde-auth-nextjs" {
  interface KindeUser extends OriginalKindeUser {
    roles?: string[];
  }
}
