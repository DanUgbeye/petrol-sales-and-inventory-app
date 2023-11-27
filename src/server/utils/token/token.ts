import { UserRole } from "@/global-types/user.types";
import { SERVER_CONFIG } from "@/server/config/server.config";
import { AuthenticationException } from "@/server/exceptions";
import jwt from "jsonwebtoken";

const secret = SERVER_CONFIG.TOKEN_SECRET;

const _3_DAYS = 3 * 24 * 60 * 60; // 3 days

export type AuthTokenPayload = {
  _id: string;
  role: UserRole;
};

export class TokenUtil {
  /**
   * creates a jwt token
   * @param data the data to create a token with
   * @param expiresIn the jwt token expiry time in seconds
   */
  createJwtToken(data: AuthTokenPayload, expiresIn: number = _3_DAYS) {
    return {
      token: jwt.sign(data, secret, { expiresIn }),
      expiresIn: Date.now() + expiresIn * 1000,
    };
  }

  /**
   * verifies and decodes a jwt token
   * @param token
   */
  verifyJwtToken(token: string) {
    let response: AuthTokenPayload;
    try {
      response = jwt.verify(token, secret) as AuthTokenPayload;
    } catch (error: any) {
      throw new AuthenticationException(error.message);
    }

    return response;
  }
}
