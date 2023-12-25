'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import XRSelect from '@/XReact/components/XRSelect/XRSelect';
import XFetch from '@/XFetch/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';
import s from './formStyle.module.css';

function Register() {
  const router = useRouter();

  const [firstname, setFirstname] = useState<string | null>(null);
  const [lastname, setLastname] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [domain, setDomain] = useState('gmail.com');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  let { current: timeout } = useRef<number | null>(null);

  useEffect(() => {
    XFetch.resume();
    return () => {
      timeout && window.clearTimeout(timeout);
      XFetch.cancel();
    }
  }, [])

  useEffect(() => {
    const condition = [firstname, lastname, email, password]
      .every(item => item && item.length > 2)
    if (condition) setDisabled(false)
    else setDisabled(true);
  }, [firstname, lastname, email, password])

  const resetStates = () => {
    setFirstname(null)
    setLastname(null)
    setEmail(null)
    setPassword(null)
    setErrorMessage(null)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resp = await XFetch.post('/users/single/register', {
        firstname: firstname,
        lastname: lastname,
        email: `${email}@${domain}`,
        password: password
      });
      const result = await resp.json();
      if (!resp.ok) throw new Error(result.message);

      setSuccessMessage('Success!');
      setDisabled(true);
      timeout = window.setTimeout(() => {
        router.push('/login');
        resetStates();
      }, 500);

    } catch (err) {
      console.log(err);
      if (err instanceof Error)
        setErrorMessage(err.message);
    }
  }

  return (
    <section id="login" className={s.section}>
      <div className={`${s.wrapper} wrapper`}>
        <form action="POST" className={s.form} onSubmit={handleSubmit}>
          <h3>Register</h3>
          <div className={s.inputs}>
            <input
              type='text'
              value={firstname || ''}
              placeholder='Firstname'
              name='firstname'
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type='text'
              value={lastname || ''}
              placeholder='Lastname'
              name='lastname'
              onChange={(e) => setLastname(e.target.value)}
            />
            <div className={s.emailArea}>
              <input
                type='text'
                value={email || ''}
                placeholder='Email'
                name='email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className={s.domain}>
                <span className={s.at}>@</span>
                <XRSelect
                  defaultValue='gmail.com'
                  data={['outlook.com', 'hotmail.com', 'yahoo.com']}
                  backgroundColor='var(--bg)'
                  textColor='var(--textClr)'
                  onChanged={(e) => setDomain((e.target as HTMLSelectElement).value)}
                />
              </div>
            </div>
            <input
              type='password'
              value={password || ''}
              placeholder="Password"
              name='password'
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
          >Register
          </button>
          <small>
            <span>Haven't an account</span>
            <Link href={'/login'}>Login</Link>
          </small>
        </form>
      </div>
    </section>
  )
}

export default Register