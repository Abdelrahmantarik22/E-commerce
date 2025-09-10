import { authOptio } from '@/auth';
import NextAuth from "next-auth"

const handler = NextAuth(authOptio)

export { handler as GET, handler as POST }//هنا انت بتقول هتبقي هندلر دي لاي ميثود جيت او بوست  للمسار اللي انت ضايفه