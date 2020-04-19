import jwt from "react-native-pure-jwt";

const ClientSecret = 'secret12345678901234567890123456789012';

export default class TokenGenerator {
      JWTSignWithUDID(email, UDID) {
            return new Promise((resolve) => {
                  const tokenPayload = {
                        scope: ['user']
                  }
                  jwt.sign(
                        {
                              iss: email,
                              exp: new Date().getTime() + 3600 * 1000, // expiration date, required, in ms, absolute to 1/1/1970
                              mobileuser: true,
                              email: email,
                              additional: tokenPayload,
                              UDID: UDID
                        }, // body
                        ClientSecret, // secret
                        {
                              alg: "HS256"
                        }
                  )
                        .then((response) => {
                              resolve(response);
                        }) // token as the only argument
                        .catch(console.error); // possible errors
            })
      }
}