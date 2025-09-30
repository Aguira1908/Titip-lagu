import React, { useEffect, useState } from 'react';
import MusicNoteIcon from '../Icon/MusicNoteIcon';
import { usePage } from '@inertiajs/react';
import { CircleX, Menu } from 'lucide-react';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const [openHam, setOpenHam] = useState(false);
  const { url } = usePage(); // dari inertia

  const handleActive = (menu) => {
    setActiveMenu(menu);
  };

  // Fungsi scroll untuk semua menu home
  const handleScrollMenu = (e, id, menu) => {
    const isHome = window.location.pathname === '/';
    if (isHome) {
      e.preventDefault(); // jangan navigasi ulang
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    handleActive(menu);
    setOpenHam(false); // tutup hamburger menu kalau di mobile
  };

  useEffect(() => {
    if (url.includes('jelajahi-pesan')) {
      setActiveMenu('jelajahi-pesan');
    } else if (url.includes('#kirim')) {
      setActiveMenu('kirim');
    } else if (url.includes('#how-it-works')) {
      setActiveMenu('how-it-works');
    } else if (url.includes('#jelajahi')) {
      setActiveMenu('jelajahi');
    } else {
      setActiveMenu('');
    }
  }, [url]);

  return (
    <header className="bg-white/60 backdrop-blur-md fixed w-full top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MusicNoteIcon />
          <a
            onClick={() => handleActive('')}
            href="/"
            className="font-bold text-xl text-gray-800"
          >
            TitipLagu
          </a>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="/#kirim"
            onClick={(e) => handleScrollMenu(e, 'kirim', 'kirim')}
            className={`${
              activeMenu === 'kirim'
                ? 'text-pink-600 font-semibold'
                : 'text-gray-600 hover:text-pink-600'
            }`}
          >
            Kirim Lagu
          </a>

          <a
            href="/#jelajahi"
            onClick={(e) => handleScrollMenu(e, 'jelajahi', 'jelajahi')}
            className={`${
              activeMenu === 'jelajahi'
                ? 'text-pink-600 font-semibold'
                : 'text-gray-600 hover:text-pink-600'
            }`}
          >
            Jelajahi Pesan
          </a>

          <a
            href="/#how-it-works"
            onClick={(e) => handleScrollMenu(e, 'how-it-works', 'how-it-works')}
            className={`${
              activeMenu === 'how-it-works'
                ? 'text-pink-600 font-semibold'
                : 'text-gray-600 hover:text-pink-600'
            }`}
          >
            Cara Kerja
          </a>
        </div>
        <button
          onClick={() => setOpenHam(!openHam)}
          aria-label="Buka Menu Navigasi"
          className="md:hidden text-gray-600"
        >
          <Menu
            className={`w-[25px] h-auto opacity-70 transition-opacity duration-300 ${
              openHam ? 'opacity-0 hidden' : 'opacity-100 inline-block'
            }`}
          />
          <CircleX
            className={`w-[25px] cursor-pointer h-auto opacity-70 transition-opacity duration-300 ${
              openHam ? 'opacity-100 inline-block' : 'opacity-0 hidden'
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-12 left-0 right-0 bottom-0 w-full h-screen bg-white lg:hidden
                    transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] 
                     ${
                       openHam
                         ? 'opacity-100 translate-y-0'
                         : 'opacity-0 -translate-y-1'
                     }
                    ${openHam ? 'pointer-events-auto' : 'pointer-events-none'}
                   `}
      >
        <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl h-full">
          <div className="py-4 w-full h-full flex flex-col overflow-y-auto">
            <section className="min-w-0 flex flex-col">
              <div className="py-4 text-gray-700 group">
                <ul className="flex flex-col justify-between items-center cursor-pointer">
                  <li className="w-full py-5 text-[18px]">
                    <a
                      href="/jelajahi-pesan"
                      onClick={() => {
                        handleActive('jelajahi-pesan');
                        setOpenHam(false);
                      }}
                      className={`${
                        activeMenu === 'jelajahi-pesan'
                          ? 'text-pink-600 font-semibold'
                          : ''
                      }`}
                    >
                      Jelajahi Pesan
                    </a>
                  </li>
                  <li className="w-full py-5 text-[18px]">
                    <a
                      href="/#kirim"
                      onClick={(e) => handleScrollMenu(e, 'kirim', 'kirim')}
                      className={`${
                        activeMenu === 'kirim'
                          ? 'text-pink-600 font-semibold'
                          : ''
                      }`}
                    >
                      Kirim Lagu
                    </a>
                  </li>
                  <li className="w-full py-5 text-[18px]">
                    <a
                      href="/#jelajahi"
                      onClick={(e) =>
                        handleScrollMenu(e, 'jelajahi', 'jelajahi')
                      }
                      className={`${
                        activeMenu === 'jelajahi'
                          ? 'text-pink-600 font-semibold'
                          : ''
                      }`}
                    >
                      Jelajahi Pesan
                    </a>
                  </li>
                  <li className="w-full py-5 text-[18px]">
                    <a
                      href="/#how-it-works"
                      onClick={(e) =>
                        handleScrollMenu(e, 'how-it-works', 'how-it-works')
                      }
                      className={`${
                        activeMenu === 'how-it-works'
                          ? 'text-pink-600 font-semibold'
                          : ''
                      }`}
                    >
                      Cara Kerja
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
