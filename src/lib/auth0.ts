import jwt from 'jsonwebtoken';
import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
  async beforeSessionSaved(session, idToken) {
    const decodedIdToken = jwt.decode(session.tokenSet.idToken)
    const roles = decodedIdToken?.['https://edv.com/roles']

    return {
      ...session,
      user: {
        ...session.user,
        user_role: (roles)
      },
    }
  },
})