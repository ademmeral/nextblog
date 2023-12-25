import { useAuth } from "@/contexts/AuthProvider"
import { useRouter } from "next/navigation";

function WithAuth(children : {children : React.ReactNode}) {
  const {auth} = useAuth();
  const router = useRouter();
  if (auth) return router.push('/')
  else children;
}

export default WithAuth