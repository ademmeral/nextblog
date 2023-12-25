'use client';
import XFetch from '@/XFetch/api';
import { useAuth } from '@/contexts/AuthProvider';
import Link from 'next/link';

function AuthLink() {
  const { auth, setAuth } = useAuth();
  const hasPermission = auth && 
    (auth.roles as number[])?.includes(427004);

  async function handleLogout(){
    try{
      XFetch.resume();
      const resp = await XFetch.get('/logout')
    } catch (err) {
      console.log(err)
    } finally {
      setAuth(null)
      XFetch.cancel();
    }
  }

  return (
    <>
      {auth ? (
        <>
          <li>
            <Link 
              href={''} 
              role='button' 
              onClick={handleLogout}
            >LOGOUT
          </Link>
          </li>
          {hasPermission &&
            <li>
              <Link href={'/posts/write'}>WRITE</Link>
            </li>
          }
        </>
      ) : (
        <>
          <li>
            <Link href={'/login'}>LOGIN</Link>
          </li>
          <li>
            <Link href={'/register'}>REGISTER</Link>
          </li>
        </>
      )
      }
    </>
  )
}

export default AuthLink