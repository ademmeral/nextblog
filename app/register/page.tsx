import Register from '@/components/Forms/Register'
import Protected from '@/components/Protected'

function RegisterPage() {
  return (
    <Protected>
      <Register />
    </Protected>
  )
}

export default RegisterPage