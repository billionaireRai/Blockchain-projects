import { AccessTokenType, SubscriptionPlans } from "@/types/token.type";
import { UserRoles } from "@/types/userrole.type";
import jsonwebtoken from "jsonwebtoken";

const secretkey = process.env.JWT_ACCESS_SECRET! ;

if (!secretkey) throw new Error("JWT_ACCESS_SECRET is not configured");

const validPlans = ["STANDARD", "PRO", "PREMIUM"] as const;
const userRoles = ["OWNER","ADMIN","FINANCER","VIEWER","GUEST"];

export function verifyAndDecodeAccessToken(token: string): AccessTokenType | null {
  try {
    const decoded = jsonwebtoken.verify(token, secretkey, { algorithms: ["HS256"], issuer: "paylume.io", audience: "paylume-apis" });

    if (typeof decoded === "string") return null ;

    if (typeof decoded.sub !== "string" || !decoded.sub || typeof decoded.email !== "string" || !decoded.email || typeof decoded.plan !== "string" || !validPlans.some((plan) => plan === decoded.plan) || typeof decoded.role !== 'string' || !userRoles.some((role) =>  role === decoded.role)) {
      return null;
    }

    return {
      userid: decoded.sub,
      email: decoded.email,
      role:decoded.role as UserRoles,
      plan: decoded.plan as SubscriptionPlans
    };
  } catch {
    return null;
  }
}