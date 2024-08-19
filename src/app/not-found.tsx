import Link from 'next/link'
import { NextPage } from 'next'

const NotFound: NextPage = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find the requested resource</p>
      <Link className="underline hover:text-grey-dark" href="/">
        Return Home
      </Link>
    </div>
  )
}

export default NotFound
