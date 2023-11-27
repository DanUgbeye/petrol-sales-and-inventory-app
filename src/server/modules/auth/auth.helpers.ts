import {
  AuthenticationException,
  AuthorizationException,
  ServerException,
} from "@/server/exceptions";
import { NextRequest } from "next/server";
import { UserDocument, UserRole } from "../user/user.types";
import { USER_ROLES } from "../user/user.types";
import { TokenUtil } from "@/server/utils/token";

export default class AuthHelpers {
  /**
   * checks if user has a specific role for the request
   * @param user user data
   * @param role required role
   */
  static hasRole(user: UserDocument, role: UserRole) {
    if (user.role === role || user.role === USER_ROLES.MANAGER) {
      return true;
    }

    throw new AuthorizationException();
  }

  /**
   * sets user cookie in a request
   * @param {NextRequest} req Next Request Object
   * @param userData the user data to set
   */
  static setUser(req: NextRequest, userData: UserDocument) {
    req.cookies.set("user", JSON.stringify(userData));
  }

  /**
   * extracts user from request
   * @param {NextRequest} req Next Request Object
   */
  static extractUserFromCookie(req: NextRequest) {
    let userCookie = req.cookies.get("user");
    const user = userCookie
      ? (JSON.parse(userCookie.value) as UserDocument)
      : null;
    return user;
  }

  /**
   * extracts auth token from request
   * @param {NextRequest} req Next Request Object
   */
  static extractAuthToken(req: NextRequest) {
    let authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return null;
    }

    let token = authHeader.split(" ")[1];
    return token || null;
  }

  /** gets user payload from token
   * @throws {BaseException}
   */
  static authenticateUser(req: NextRequest) {
    const authToken = AuthHelpers.extractAuthToken(req);

    if (!authToken) {
      throw new AuthenticationException("auth token not found");
    }

    const tokenUtil = new TokenUtil();
    const authPayload = tokenUtil.verifyJwtToken(authToken);
    return authPayload;
  }
}
