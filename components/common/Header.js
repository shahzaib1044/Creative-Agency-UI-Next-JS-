import Link from "next/link"
import { TitleLogo } from "./Title"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { RiMenu4Line } from "react-icons/ri"
import { AiOutlineClose } from "react-icons/ai"

const Header = ({cartdata,setCartdata}) => {
   
  const [activeLink, setActiveLink] = useState("");
  const [open, setOpen] = useState(false)
  const [cartStorage, setCartStorage] = useState(null);
  const [cartNumber,setCartNumber]=useState(cartStorage?.length);
  const[cartitem,setCartItem]=useState(cartStorage);
 

  useEffect(() => {
    // Ensure that the code runs only on the client side
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCartStorage(JSON.parse(storedCart));
      }
    }
  }, []);
useEffect(()=>{
  if(cartdata){
    if(cartNumber){
      let localCartItem=cartitem;
      localCartItem.push(JSON.parse(JSON.stringify(cartdata)))

    }
    else{
      setCartNumber();
      setCartItem(cartdata)

    }
    localStorage.setItem('cart',JSON.stringify([cartdata]))
  }
})
  const router = useRouter()
  useEffect(() => {
    setActiveLink(router.pathname)
  }, [router.pathname])
  return (
    <>
      <header>
        <div className='container'>
          <div className='logo'>
            <Link href='/'>
              <TitleLogo title='Curl '  className='logomin' />
            </Link>
          </div>
          <nav className={open ? "openMenu" : "closeMenu"} onClick={() => setOpen(null)}>
            <Link href='/' className={activeLink == "/" ? "activeLink" : "none"}>
              Home
            </Link>
            <Link href='/salon' className={activeLink == "/salon" ? "activeLink" : "none"}>
              Salon
            </Link>
            {/* <Link href='/staff' className={activeLink == "/staff" ? "activeLink" : "none"}>
              Staff
            </Link> */}
            <Link href='/services' className={activeLink == "/services" ? "activeLink" : "none"}>
              Services
            </Link>
            <Link href='/showcase' className={activeLink == "/showcase" ? "activeLink" : "none"}>
              SHOP
            </Link>
            <Link href='/blogs' className={activeLink == "/blogs" ? "activeLink" : "none"}>
              Blog
            </Link>
            <Link href='/contact' className={activeLink == "/contact" ? "activeLink" : "none"}>
              Contact
            </Link>
             <Link href='/appointment' className={activeLink == "/appointment" ? "activeLink" : "none"}>
              Appointment
            </Link> 
            {/* <button className='button-primary'>GET CERTIFICATE</button> */}
          </nav>
          <button onClick={() => setOpen(!open)}>{open ? <AiOutlineClose size={25} /> : <RiMenu4Line size={25} />}</button>
        </div>
      </header>
    </>
  )
}

export default Header
