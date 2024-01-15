import { useState, useEffect } from 'react';
import { styles } from './style';
import close from '../assets/close.svg';
import menu from '../assets/menu.svg';
import Link from 'next/link';

const logo = 'Hackers Path';

const navLinks = [
  {
    id: '/',
    title: 'Home',
  },
  {
    id: 'learn',
    title: 'Learn',
  },
  {
    id: 'login',
    title: 'Login',
  },
];

const Navbar: React.FC = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolling up, even from a non-zero position
      if (currentScrollY < prevScrollY && currentScrollY > 0) {
        setScrolled(true); // Make navbar visible
      }

      // Update the previous scrollY position
      prevScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleUpScroll = () => {
      // Check if scrolling up, even from a non-zero position
      if (window.scrollY < 50) {
        setScrolled(false); // Make navbar invisible when at the top
      }
    };

    window.addEventListener('scroll', handleUpScroll);

    return () => window.removeEventListener('scroll', handleUpScroll);
  }, []);

  const handleToggleClick = () => {
    setToggle(!toggle);
  };

  const handleMenuClose = () => {
    setToggle(false);
  };

  return (
    <div className="mb-[100px]">
      <div
        className={`${styles.paddingX} w-full fixed top-0 z-20 transition-all duration-500 ease-in-out
          ${scrolled ? '-translate-y-full' : ''}`}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto border-4 border-gray-400 bg-white p-4 pt-5 rounded-xl">
          <Link
            href="/"
            passHref
            className="flex items-center gap-2"
            onClick={() => {
              setActive('');
              window.scrollTo(0, 0);
            }}
          >
            
            <p className="bg-white text-[18px] font-bold cursor-pointer flex ">
              Hackers Path 
            </p>
          </Link>

          <ul className="list-none hidden sm:flex flex-row gap-10 bg-white">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? 'text-teal-400' : 'text-secondary'
                } hover:text-teal-400 bg-white text-[18px] font-medium cursor-pointer pt-1`}
                onClick={() => setActive(nav.title)}
              >
                <Link href={"/"+nav.id}>
                  <p className='bg-white'>{nav.title}</p>
                </Link>
              </li>
            ))}
            <li className='bg-white'>
              <Link className='inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-400 hover:bg-pink-500 focus:shadow-outline focus:outline-none' href="/contact">
                  Schedule a Call
              </Link>
            </li>
          </ul>

          <div className="sm:hidden flex flex-1 justify-end items-center ">
            <img
              src={toggle ? 'https://www.svgrepo.com/show/500512/close-bold.svg' : 'https://www.svgrepo.com/show/532195/menu.svg'}
              alt="menu"
              className="w-[28px] h-[28px] object-contain cursor-pointer "
              onClick={handleToggleClick}
            />

            {toggle && (
              <div
                className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
                onClick={handleMenuClose}
              ></div>
            )}

            <div
              className={`${
                !toggle ? 'hidden' : 'flex'
              } p-6 bg-gray-200 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl animate-fadeIn`}
            >
              <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`font-poppins font-medium cursor-pointer text-[16px] ${
                      active === nav.title ? 'text-white' : 'text-secondary'
                    } animate-slideIn`}
                    onClick={() => {
                      setToggle(!toggle);
                      setActive(nav.title);
                    }}
                  >
                    <Link href={`#${nav.id}`}>
                      <p>{nav.title}</p>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/contact">
                    <p className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-400 hover:bg-pink-500 focus:shadow-outline focus:outline-none">
                      Schedule a Call
                    </p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
