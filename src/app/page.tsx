import { redirect } from 'next/navigation'
import { NextPage } from 'next'

const Home: NextPage = () => {
  // Redirect to the dashboard
  redirect('/dashboard')
  return null
};

export default Home;

