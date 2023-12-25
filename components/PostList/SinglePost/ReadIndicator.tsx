'use client';

import XFetch from "@/XFetch/api";
import { useReadObserverContext } from "@/XReact/contexts/XRReadObserver/XRReadObserver"
import { getIpAddress, updatePost } from "@/utils/utils";
import { useEffect, useState } from 'react';

function ReadIndicator({readBy, id} : {id: string, readBy: string[]}) {
  const { isRead, restart } = useReadObserverContext();
  const [ip, setIp] = useState('');

  useEffect(() => {
    XFetch.resume();
    
    getIpAddress()
      .then(obj => setIp(obj.ipAddress))
      .catch(console.log);

    return () => { XFetch.cancel();}
  }, []);

  useEffect(() => {
    if (isRead && !readBy.includes(ip))
      updatePost({ $addToSet: { readBy: ip } }, id);
  }, [isRead])

  return <span>{`${readBy.length} reads`}</span>
}

export default ReadIndicator