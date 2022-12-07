import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
const Nav = () => {

  const administrativeaddress ="0x1BCE266cf7d0693BAbb305686f6ebe1A4E4522d3";
  const [isconnected,setisconnected] = useState(false);
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setisconnected(true);
    }
  });



  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href='/'>News</Link>
        </li>

        <li>
          <Link href='/about'>About</Link>
        </li>
      <li>
       
       <Link href='/eadminfind'>Espace admin</Link>
     </li>
     <li>
       
       <Link href='/eclient'>Espace client</Link>
     </li>
        
      </ul>
    </nav>
  )
}

export default Nav
