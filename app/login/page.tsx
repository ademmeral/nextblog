import Protected from "@/components/Protected"
import Login from "@/components/Forms/Login"
import { delay } from "@/utils/utils"

async function LoginPage() {
  return (
    <Protected>
      <Login />
    </Protected>
  )
}

export default LoginPage