import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import ProfileMenu from './ProfileMenu';
import { Button } from '@material-tailwind/react';
import { AuthWrapper } from '../AuthWrapper';

const navLinks = [
  {
    id: '/',
    title: 'Home',
  },
  {
    id: 'learn',
    title: 'Learn',
  },
];

const Navbar: React.FC = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        setScrolled(false);
      } else if (currentScrollY < prevScrollY || currentScrollY === 0) {
        setScrolled(true);
      }

      prevScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    // Check authentication status
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    return () => window.removeEventListener('scroll', handleScroll);
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
        className={`bg-black w-full fixed top-0 z-20 transition-all duration-500 ease-in-out ${scrolled ? '' : '-translate-y-full'
          }`}
      >
        <div className="max-w-[94%] mx-auto flex justify-between items-center bg-transparent p-4">
          <Link
            href="/"
            passHref
            className="flex items-center gap-2"
            onClick={() => {
              setActive('');
              window.scrollTo(0, 0);
            }}
          >
            <p className="text-white text-[18px] font-bold cursor-pointer flex ">
              Hackers Path
            </p>
          </Link>

          <ul className="list-none hidden sm:flex flex-row gap-10 text-white">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${active === nav.title ? 'text-teal-400' : 'text-secondary'
                  } hover:text-teal-400 text-white text-[18px] font-medium cursor-pointer pt-1`}
                onClick={() => setActive(nav.title)}
              >
                <Link href={"/" + nav.id}>
                  <p className="text-white">{nav.title}</p>
                </Link>
              </li>
            ))}
            <li className="text-white">
              <div className="sm:hidden flex flex-1 justify-end items-center">
                <Image
                  width={25}
                  height={25}
                  src={toggle ? 'https://www.svgrepo.com/show/500512/close-bold.svg' : 'https://www.svgrepo.com/show/532195/menu.svg'}
                  alt="menu"
                  className="w-[28px] h-[28px] object-contain cursor-pointer"
                  onClick={handleToggleClick}
                />

                {toggle && (
                  <div
                    className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
                    onClick={handleMenuClose}
                  ></div>
                )}

                <div
                  className={`${!toggle ? 'hidden' : 'flex'
                    } p-6 bg-gray-200 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl animate-fadeIn`}
                >
                  <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
                    {navLinks.map((nav) => (
                      <li
                        key={nav.id}
                        className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? 'text-white' : 'text-secondary'
                          } animate-slideIn`}
                        onClick={() => {
                          setToggle(!toggle);
                          setActive(nav.title);
                        }}
                      >
                        <Link href={`${nav.id}`}>
                          <p>{nav.title}</p>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <div className="hidden sm:flex flex-1 justify-end items-center">
                        {isAuthenticated ? (
                          // <ProfileMenu />
                          <p>Profile</p>
                        ) : (
                          <Link href="/login">
                            <Button variant="gradient" size="sm">Sign in</Button>
                          </Link>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>


            </li>
          </ul>


        </div>
      </div>
    </div>
  );
};

export default Navbar;
