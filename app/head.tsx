import type { Metadata } from 'next'

export const metadata: Record<string, any> = {
  title: 'NEXTBLOG',
  description: 'Where you can find anything about programming!',
};

function head() {
  return (
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{metadata.title}</title>
    </head>
  )
}

export default head