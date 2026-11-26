import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { cartStore } from '../store/cartStore';

const links = [
  { href: '/collections', label: 'Shop', match: (path: string) => path.startsWith('/collections') || path.startsWith('/product') },
  { href: '/blog', label: 'Blog', match: (path: string) => path.startsWith('/blog') },
  { href: '/faqs', label: 'FAQs', match: (path: string) => path.startsWith('/faqs') },
  { href: '/contact', label: 'Contact', match: (path: string) => path.startsWith('/contact') },
];

function SearchField({
  id,
  className,
  value,
  onChange,
}: {
  id: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <form action="/collections" method="get" role="search" className={className}>
      <label htmlFor={id} className="sr-only">Search fragrances</label>
      <div className="relative">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#1C140C]/45" />
        <input
          id={id}
          type="search"
          name="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search fragrances"
          className="h-9 w-full rounded-full border border-[#D4AF37]/15 bg-[#1C140C]/[0.04] pl-9 pr-3 text-sm text-[#1C140C] placeholder:text-[#1C140C]/40 outline-none focus:border-[#D4AF37] focus:bg-white"
        />
      </div>
    </form>
  );
}

export const Navbar: React.FC = () => {
  const [itemCount, setItemCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
      setSearchValue(new URLSearchParams(window.location.search).get('search') || '');
    }
    const update = () => {
      setItemCount(cartStore.getItemCount());
    };
    update();
    return cartStore.subscribe(update);
  }, []);

  return (
    <header className="w-full bg-white z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 flex items-center gap-2 sm:gap-6 min-w-0">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden shrink-0 p-1.5 text-[#1C140C] cursor-pointer rounded-md"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <a href="/" className="min-w-0 flex items-center gap-1.5 sm:gap-2">
          <img src="/logo.png" alt="" className="h-9 w-auto shrink-0 bg-transparent sm:h-11" />
          <span className="min-w-0 font-['Cormorant_Garamond',serif] font-medium uppercase leading-none text-[#1C140C]">
            <span className="block text-[15px] tracking-[0.06em] sm:hidden">
              Dion
              <span className="mt-0.5 block">Fragrance</span>
            </span>
            <span className="hidden truncate sm:inline sm:text-[22px] sm:tracking-[0.06em] lg:text-[28px]">
              Dion Fragrance
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex flex-1 items-center justify-center gap-7 font-['Barlow_Condensed',sans-serif] text-[18px] font-bold tracking-[0.04em] uppercase">
          {links.map((link) => {
            const active = link.match(currentPath);
            return (
              <a
                key={link.href}
                href={link.href}
                className={active ? 'text-[#1C140C] underline decoration-[#D4AF37] decoration-2 underline-offset-4' : 'text-[#1C140C]/70 hover:text-[#1C140C]'}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <SearchField
          id="header-search"
          value={searchValue}
          onChange={setSearchValue}
          className="hidden lg:block w-56 xl:w-64 shrink-0"
        />

        <button
          onClick={() => cartStore.openDrawer()}
          className="ml-auto shrink-0 lg:ml-0 p-1.5 sm:p-2 text-[#1C140C] relative cursor-pointer"
          aria-label="Shopping Bag"
        >
          <ShoppingBag size={22} strokeWidth={1.5} />
          <span className="absolute top-0.5 right-0.5 bg-[#D4AF37] text-[#1C140C] text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
            {itemCount}
          </span>
        </button>
      </div>

      <div className="lg:hidden px-3.5 sm:px-6 pb-3">
        <SearchField
          id="header-search-mobile"
          value={searchValue}
          onChange={setSearchValue}
        />
      </div>

      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-gray-200 px-5 py-3 font-['Barlow_Condensed',sans-serif] text-xl font-bold uppercase text-[#1C140C]">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 border-b border-gray-100 last:border-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
