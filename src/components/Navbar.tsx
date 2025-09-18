'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Bars3Icon, 
  XMarkIcon, 
  WalletIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';
import { useWeb3 } from '@/contexts/Web3Context';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isEventsPage = pathname.startsWith('/events');
  const { isConnected, address, isCompany, isDeveloper, tokenBalance, reputation } = useWeb3();
  
  const jobLinks = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Companies', href: '/companies', icon: '🏢' },
    { name: 'Developers', href: '/developers', icon: '👨‍💻' },
    { name: 'Freelancers', href: '/freelancers', icon: '💼' },
    { name: 'Profile', href: '/profile', icon: '👤' },
  ];
  
  const eventLinks = [
    { name: 'Events', href: '/events', icon: '📅' },
    { name: 'My Events', href: '/events/my-events', icon: '🎫' },
    { name: 'Create Event', href: '/events/create', icon: '➕' },
    { name: 'Communities', href: '/events/communities', icon: '🌐' },
  ];
  
  const navLinks = isEventsPage ? eventLinks : jobLinks;

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatTokenBalance = (balance: bigint | null) => {
    if (!balance) return '0';
    return (Number(balance) / 1e18).toFixed(2);
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-cyan-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={isEventsPage ? '/' : '/events'} className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center neon-glow animate-neon-pulse">
                <span className="text-black font-bold text-sm">W3</span>
              </div>
              <span className="text-xl font-bold gradient-text group-hover:scale-105 transition-transform animate-glow">
                {isEventsPage ? 'Web3Events' : 'Web3Jobs'}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-cyan-400 bg-cyan-400/10 neon-glow'
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-white/10'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-base">{link.icon}</span>
                  <span>{link.name}</span>
                </span>
                {pathname === link.href && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full neon-glow" />
                )}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {!isConnected ? (
              <ConnectButton />
            ) : (
              <div className="flex items-center space-x-2">
                {/* User Status */}
                <div className="hidden sm:flex items-center space-x-3 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm border border-green-400/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse neon-glow" />
                  <span>Connected</span>
                  <span className="text-xs text-gray-300">
                    {formatAddress(address!)}
                  </span>
                </div>

                {/* User Role Badge */}
                {(isCompany || isDeveloper) && (
                  <div className="hidden sm:flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cyan-400/20 text-cyan-400 border border-cyan-400/30">
                    {isCompany ? '🏢 Company' : '👨‍💻 Developer'}
                  </div>
                )}

                {/* Token Balance */}
                {tokenBalance && tokenBalance > 0n && (
                  <div className="hidden sm:flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-400/20 text-purple-400 border border-purple-400/30">
                    {formatTokenBalance(tokenBalance)} YJT
                  </div>
                )}

                {/* Reputation Score */}
                {reputation && reputation > 0 && (
                  <div className="hidden sm:flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
                    ⭐ {reputation}
                  </div>
                )}

                <button className="btn-ghost p-2">
                  <UserCircleIcon className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Switch platform button */}
            <Link
              href={isEventsPage ? '/' : '/events'}
              className="btn-secondary flex items-center space-x-2"
            >
              <span>{isEventsPage ? 'Jobs' : 'Events'}</span>
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden btn-ghost p-2"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cyan-400/20 glass">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-cyan-400 bg-cyan-400/10 neon-glow'
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
            
            <div className="pt-4 border-t border-cyan-400/20">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-gray-300">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
