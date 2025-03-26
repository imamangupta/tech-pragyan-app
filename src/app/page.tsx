import { Button } from "@/components/ui/button";
import Link from "next/link";

import Hero from './components/Hero'
import Feature from './components/Feature'
import Steps from './components/Steps'
import Review from './components/Review'
import Footer from './components/Footer'


export default function Home() {
  return (
    <>
      <Link href="/dashboard/overview">
        <Button>DashBoard</Button>
      </Link>
      <Link href="/signup">
        <Button>Signup</Button>
      </Link>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
      <Link href="/login">
        <Button>Login</Button>
      </Link>

    <Hero/>
    <Feature/>
    <Steps/>
    <Review/>
    <Footer/>

    </>
  );
}
