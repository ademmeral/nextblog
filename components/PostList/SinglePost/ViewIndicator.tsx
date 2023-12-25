'use client';

import XFetch from "@/XFetch/api";
import { getIpAddress, updatePost } from "@/utils/utils";
import { useEffect, useState } from 'react'

function ViewIndicator({ viewedBy, id }: { id: string, viewedBy: string[] }) {
  const [ip, setIp] = useState('');
  
  useEffect(() => {
    XFetch.resume();
    
    getIpAddress()
      .then(obj => setIp(obj.ipAddress))
      .catch(console.log);

    return () => { XFetch.cancel();}
  }, []);

  useEffect(() => {
    if (ip && !viewedBy.includes(ip)) {
      XFetch.resume();
      updatePost({ $addToSet: { viewedBy: ip } }, id)
      return () => {
        XFetch.cancel()
      }
    }
  }, [ip])

  return <span>{`${viewedBy.length} views`}</span>
}

export default ViewIndicator