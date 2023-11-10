export const TOKEN_SECRET = process.env.TOKEN_SECRET || "tokenultrasecreto";

import { encode } from "jwt-simple";
import moment from "moment";
import { TOKEN_SECRET as _TOKEN_SECRET } from "./config";

export function createToken (user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };
  return encode(payload, _TOKEN_SECRET);
}