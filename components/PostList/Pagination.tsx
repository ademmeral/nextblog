'use client';

import { useState } from 'react';
import Link from 'next/link';
import s from './style.module.css';
import { useRouter } from 'next/navigation';

// it is looking kinda soup because of TS

function Pagination ({ max }: { max: number }) {
  const [url,] = useState<URL>(new URL(
    decodeURIComponent(window.location.href).replaceAll(/\?page=(\d+)&/gi, '')
  ));
  const [page, setPage] = useState( (+(url.searchParams.get('page') as string)) || 1 )
  const router = useRouter();
  const pathname = decodeURIComponent(url.href as string).replaceAll(/\?page=\d+/gi, '')

  const prevPageButton  = (e:React.MouseEvent<HTMLButtonElement>) => {
    setPage(() => page - 1);
    if (!(page <= 1)) router.replace(`${pathname}?page=${page - 1}`);

  };

  const nextPageButton  = (e:React.MouseEvent<HTMLButtonElement>) => {
    setPage(() => page + 1);
    if (!(page >= max)) router.replace(`${pathname}?page=${page + 1}`);
  };

  return (
    <div className={s.pagination}>
      <button
        disabled={page <= 1 } 
        onClick={prevPageButton} 
        id={s.prev}
      >Prev
      </button>
      <button
        disabled={page >= max}
        onClick={nextPageButton}
        id={s.prev}
        >Next
      </button>
    </div>
  )
}
export default Pagination

// {
//   pathname,
//   query: { page:  page + 1}
// }