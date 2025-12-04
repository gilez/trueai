import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, Sun, Moon, ChevronDown } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
        setActiveDropdown(null);
    }, [location]);

    const navLinks = [

        {
            name: 'About TRUE-AI',
            path: '/about',
            subItems: [
                { name: 'Director\'s Greeting', path: '/about/greeting' },
                { name: 'Vision & Goals', path: '/about/vision' }
            ]
        },
        { name: 'Research', path: '/research' },
        { name: 'Faculty', path: '/faculty' },
        { name: 'News', path: '/news' },
    ];

    const toggleDropdown = (name) => {
        if (activeDropdown === name) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(name);
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'
                }`}
        >
            <div className={`container-custom mx-auto px-6`}>
                <div
                    className={`relative flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${scrolled
                        ? 'glass shadow-lg bg-background/80 border-border'
                        : 'bg-transparent border-transparent'
                        }`}
                >
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 z-50">
                        <img
                            src={`${import.meta.env.BASE_URL}bk21-logo.png`}
                            alt="BK21 Logo"
                            className="h-8 w-auto object-contain dark:invert dark:brightness-90"
                        />
                        <div className="h-8 w-px bg-border"></div>
                        <span className="text-lg font-bold tracking-tight text-foreground">
                            Ewha<span className="text-primary"> TRUE-AI</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group">
                                {link.subItems ? (
                                    <button
                                        className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${location.pathname.startsWith(link.path)
                                            ? 'text-primary'
                                            : 'text-muted-foreground'
                                            }`}
                                    >
                                        {link.name}
                                        <ChevronDown size={14} />
                                    </button>
                                ) : (
                                    <Link
                                        to={link.path}
                                        className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path
                                            ? 'text-primary'
                                            : 'text-muted-foreground'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                )}

                                {/* Dropdown Menu */}
                                {link.subItems && (
                                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <div className="glass rounded-xl p-2 min-w-[200px] shadow-xl border border-border bg-background/90 backdrop-blur-md">
                                            {link.subItems.map((subItem) => (
                                                <Link
                                                    key={subItem.path}
                                                    to={subItem.path}
                                                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors whitespace-nowrap"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            className="z-50 text-foreground hover:text-primary transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Navigation Overlay */}
                    <div
                        className={`fixed inset-0 bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-8 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                            }`}
                    >
                        {navLinks.map((link) => (
                            <div key={link.name} className="flex flex-col items-center gap-4">
                                {link.subItems ? (
                                    <>
                                        <button
                                            onClick={() => toggleDropdown(link.name)}
                                            className={`text-2xl font-medium transition-colors hover:text-primary flex items-center gap-2 ${location.pathname.startsWith(link.path)
                                                ? 'text-primary'
                                                : 'text-muted-foreground'
                                                }`}
                                        >
                                            {link.name}
                                            <ChevronDown size={20} className={`transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                                        </button>
                                        {activeDropdown === link.name && (
                                            <div className="flex flex-col items-center gap-4 animate-fade-in">
                                                {link.subItems.map((subItem) => (
                                                    <Link
                                                        key={subItem.path}
                                                        to={subItem.path}
                                                        className="text-lg text-muted-foreground hover:text-primary transition-colors"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        to={link.path}
                                        className={`text-2xl font-medium transition-colors hover:text-primary ${location.pathname === link.path
                                            ? 'text-primary'
                                            : 'text-muted-foreground'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
