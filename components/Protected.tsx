'use client';

import XRSpinner from "@/XReact/components/XRSpinner/XRSpinner";
import { useAuth } from "@/contexts/AuthProvider"
import { delay } from "@/utils/utils";
import { redirect } from "next/navigation";
import { useState, useLayoutEffect } from 'react';

function Protected({ children }: { children: React.ReactNode }) {
  const { auth } = useAuth();
  const [checked, setChecked] = useState(false)
  
  useLayoutEffect(() => {
    if (auth) return redirect('/');
    setChecked(true);
  }, [])
  
  if (!checked) return <XRSpinner color="var(--textClr)" size={100} thickness={5}/>;
  return children;
}

export default Protected