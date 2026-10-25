import { UserRoles } from "./userrole.type";

export type SubscriptionPlans = "STANDARD" | "PRO" | "PREMIUM" ;

export interface AccessTokenType {
    userid:string ;
    email:string ;
    role:UserRoles
    plan:SubscriptionPlans ;
}

export interface RefreshTokenType {
    userid:string;
}