
import Logo from "/img/hplus_logo.png"
import Cpanel from "/img/cpanel.png"

const Footer = () => {
  return (
    <footer className='flex justify-around items-center mt-auto bg-opacity-50 bg-cyan-900'>
      <img src={Cpanel} alt="logo_cpanel" className="max-h-12 max-w-12 bg-"/>
      <span className='font-bold'>Made by DA</span>
      <img src={Logo} alt="logo_hplus" className="max-h-32 max-w-32"/>
    </footer>
  )
}

export default Footer