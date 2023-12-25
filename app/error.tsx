'use client';

function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <article className="wrapper w-full h-full flex flex-col gap-4 items-center justify-center">
      <h2>{error.name}</h2>
      <p className="text-2xl font-md">{error.message}</p>
    </article>
  )
}

export default GlobalErrorPage;