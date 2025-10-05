import { createAuthClient } from "better-auth/react"
import { emailOTPClient } from "better-auth/client/plugins"
export const authClient = createAuthClient({
    plugins: [
        emailOTPClient()
    ],
    /** The base URL of the server (optional if you're using the same domain) */
  
})