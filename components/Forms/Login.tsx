'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';
import XFetch from '@/XFetch/api';
import s from './formStyle.module.css';



function Login() {
  const { setAuth } = useAuth();
  const [user, setUser] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  let { current: timeout } = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    XFetch.resume();
    return () => {
      timeout && window.clearTimeout(timeout);
      XFetch.cancel()
    }
  }, []);

  useEffect(() => {
    const condition = [user, password]
      .every(item => item && item.length > 2)
    if (condition) setDisabled(false)
    else setDisabled(true);
  }, [user, password])

  const resetStates = () => {
    setUser(null)
    setPassword(null)
    setErrorMessage(null)
    setSuccessMessage(null)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await XFetch.post('/users/single/login', { password, user });
      const result = await resp.json();
      if (!resp.ok) throw new Error(result.message);

      setAuth({ ...result });
      setSuccessMessage('Success!');
      setDisabled(true);

      timeout = window.setTimeout(() => {
        router.push('/');
        resetStates();
      }, 500);
    } catch (err) {
      if (err instanceof Error)
        setErrorMessage(err.message);
    }
  }

  return (
    <section id="login" className={s.section}>
      <div className={`${s.wrapper} wrapper`}>
        <form action="POST" className={s.form} onSubmit={handleSubmit}>
          <h3>Login</h3>
          <div className={s.inputs}>
            <input
              type='text'
              value={user || ''}
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              type='password'
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage &&
            <span className={s.errorMessage}>{errorMessage}</span>
          }
          {!errorMessage && successMessage &&
            <span className={s.successMessage}>{successMessage}</span>
          }
          <button
            className={s.submit}
            disabled={disabled}
          >Login
          </button>
          <small>
            <span>Haven't an account</span>
            <Link href={'/register'}>Register</Link>
          </small>
        </form>
      </div>
    </section>
  )
}

export default Login