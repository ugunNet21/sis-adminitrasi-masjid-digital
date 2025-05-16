import {
    useEffect,
    useState,
} from 'react';

import {
    Head,
    Link,
    usePage,
} from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage().props;
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Initialize theme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            setDarkMode(savedTheme === 'dark');
        } else if (prefersDark) {
            setDarkMode(true);
            localStorage.setItem('theme', 'dark');
        } else {
            setDarkMode(false);
            localStorage.setItem('theme', 'light');
        }
    }, []);

    useEffect(() => {
        // Apply dark mode class to document
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
    };

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    const closeMobileNav = () => {
        setIsMobileNavOpen(false);
    };

    const scrollToSection = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        closeMobileNav();
    };

    return (
        <>
            <Head title="MasjidCMS - Welcome to Our Community">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=poppins:300,400,500,600,700" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
            </Head>

            {/* Navigation */}
            <nav className="bg-white shadow-sm fixed w-full z-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <i className="fas fa-mosque text-2xl text-blue-500 mr-2"></i>
                            <span className="text-xl font-bold text-gray-800 dark:text-white">Masjid<span className="text-blue-500">CMS</span></span>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <a
                                href="#home"
                                className="nav-item px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                onClick={(e) => scrollToSection(e, 'home')}
                            >
                                Home
                            </a>
                            <a
                                href="#about"
                                className="nav-item px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                onClick={(e) => scrollToSection(e, 'about')}
                            >
                                About
                            </a>
                            <a
                                href="#prayer"
                                className="nav-item px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                onClick={(e) => scrollToSection(e, 'prayer')}
                            >
                                Prayer Times
                            </a>
                            <a
                                href="#events"
                                className="nav-item px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                onClick={(e) => scrollToSection(e, 'events')}
                            >
                                Events
                            </a>
                            <a
                                href="#donate"
                                className="nav-item px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                onClick={(e) => scrollToSection(e, 'donate')}
                            >
                                Donate
                            </a>
                            <button
                                id="themeToggle"
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={toggleTheme}
                            >
                                <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-gray-600 dark:text-gray-300`}></i>
                            </button>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Admin Login
                                </Link>
                            )}
                        </div>
                        <div className="md:hidden flex items-center">
                            <button
                                id="mobileNavToggle"
                                className="text-gray-500 dark:text-gray-300"
                                onClick={toggleMobileNav}
                            >
                                <i className={`fas ${isMobileNavOpen ? 'fa-times' : 'fa-bars'} text-2xl`} id="mobileMenuIcon"></i>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile Navigation */}
                <div
                    className={`mobile-nav fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden dark:bg-gray-800 ${isMobileNavOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                        <span className="text-xl font-bold text-gray-800 dark:text-white">Masjid<span className="text-blue-500">CMS</span></span>
                        <button
                            id="mobileNavClose"
                            className="text-gray-500 dark:text-gray-300"
                            onClick={closeMobileNav}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="p-4 space-y-4">
                        <a
                            href="#home"
                            className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={(e) => scrollToSection(e, 'home')}
                        >
                            Home
                        </a>
                        <a
                            href="#about"
                            className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={(e) => scrollToSection(e, 'about')}
                        >
                            About
                        </a>
                        <a
                            href="#prayer"
                            className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={(e) => scrollToSection(e, 'prayer')}
                        >
                            Prayer Times
                        </a>
                        <a
                            href="#events"
                            className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={(e) => scrollToSection(e, 'events')}
                        >
                            Events
                        </a>
                        <a
                            href="#donate"
                            className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={(e) => scrollToSection(e, 'donate')}
                        >
                            Donate
                        </a>
                        <button
                            id="themeToggleMobile"
                            className="w-full text-left px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={toggleTheme}
                        >
                            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} mr-2`}></i> Toggle Theme
                        </button>
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-center"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-center"
                            >
                                Admin Login
                            </Link>
                        )}
                    </div>
                </div>
                <div
                    className={`nav-overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden dark:bg-opacity-70 ${isMobileNavOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    onClick={closeMobileNav}
                ></div>
            </nav>

            {/* Hero Section */}
            <section
                id="home"
                className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white pt-16"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">Welcome to MasjidCMS</h1>
                    <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">Join our vibrant community, stay updated with prayer times, events, and contribute to our mission.</p>
                    <div className="space-x-4">
                        <a
                            href="#donate"
                            className="inline-block px-6 py-3 bg-white text-blue-500 font-semibold rounded-md hover:bg-gray-100"
                            onClick={(e) => scrollToSection(e, 'donate')}
                        >
                            Donate Now
                        </a>
                        <a
                            href="#events"
                            className="inline-block px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-md hover:bg-white hover:text-blue-500"
                            onClick={(e) => scrollToSection(e, 'events')}
                        >
                            Explore Events
                        </a>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in dark:text-white">About Our Masjid</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-fade-in dark:bg-gray-800 dark:border-gray-700">
                            <h3 className="text-xl font-semibold mb-4 dark:text-white">Our Mission</h3>
                            <p className="text-gray-600 dark:text-gray-400">To foster a welcoming community that promotes spiritual growth, education, and charity, guided by Islamic values.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-fade-in dark:bg-gray-800 dark:border-gray-700">
                            <h3 className="text-xl font-semibold mb-4 dark:text-white">Our Vision</h3>
                            <p className="text-gray-600 dark:text-gray-400">To be a beacon of light, uniting people through faith, knowledge, and compassion for a better tomorrow.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prayer Times Section */}
            <section id="prayer" className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in dark:text-white">Today's Prayer Times</h2>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-2xl mx-auto animate-fade-in dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold dark:text-white">Friday, May 16, 2025</h3>
                            <a href="#" className="text-sm text-blue-500 hover:underline">View Full Schedule</a>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                <div className="flex items-center">
                                    <i className="fas fa-sun text-yellow-500 mr-3"></i>
                                    <span className="dark:text-gray-300">Subuh</span>
                                </div>
                                <span className="font-medium dark:text-gray-300">5:15 AM</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-lg dark:bg-gray-800">
                                <div className="flex items-center">
                                    <i className="fas fa-sun text-orange-500 mr-3"></i>
                                    <span className="dark:text-gray-300">Dzuhur</span>
                                </div>
                                <span className="font-medium dark:text-gray-300">12:30 PM</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                <div className="flex items-center">
                                    <i className="fas fa-sun text-red-500 mr-3"></i>
                                    <span className="dark:text-gray-300">Ashar</span>
                                </div>
                                <span className="font-medium dark:text-gray-300">3:45 PM</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-lg dark:bg-gray-800">
                                <div className="flex items-center">
                                    <i className="fas fa-moon text-purple-500 mr-3"></i>
                                    <span className="dark:text-gray-300">Maghrib</span>
                                </div>
                                <span className="font-medium dark:text-gray-300">6:20 PM</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                <div className="flex items-center">
                                    <i className="fas fa-moon text-indigo-500 mr-3"></i>
                                    <span className="dark:text-gray-300">Isya</span>
                                </div>
                                <span className="font-medium dark:text-gray-300">7:45 PM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section id="events" className="py-16 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in dark:text-white">Upcoming Events</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 animate-fade-in dark:bg-gray-800 dark:border-gray-700">
                            <img src="https://source.unsplash.com/random/400x300/?quran" alt="Event" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2 dark:text-white">Quran Recitation</h3>
                                <p className="text-sm text-gray-600 mb-4 dark:text-gray-400">Tomorrow, 8:00 PM - Main Hall</p>
                                <a href="#" className="text-blue-500 hover:underline">Learn More</a>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 animate-fade-in dark:bg-gray-800 dark:border-gray-700">
                            <img src="https://source.unsplash.com/random/400x300/?islamic" alt="Event" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2 dark:text-white">Islamic Finance Class</h3>
                                <p className="text-sm text-gray-600 mb-4 dark:text-gray-400">Friday, 6:00 PM - Conference Room</p>
                                <a href="#" className="text-blue-500 hover:underline">Learn More</a>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 animate-fade-in dark:bg-gray-800 dark:border-gray-700">
                            <img src="https://source.unsplash.com/random/400x300/?iftar" alt="Event" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2 dark:text-white">Community Iftar</h3>
                                <p className="text-sm text-gray-600 mb-4 dark:text-gray-400">Saturday, 6:30 PM - Dining Area</p>
                                <a href="#" className="text-blue-500 hover:underline">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Donation Section */}
            <section id="donate" className="py-16 bg-gradient-to-r from-blue-500 to-green-500 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">Support Our Masjid</h2>
                    <div className="bg-white p-6 rounded-xl shadow-sm max-w-md mx-auto text-gray-800 animate-fade-in">
                        <h3 className="text-xl font-semibold mb-4">Make a Donation</h3>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Amount</label>
                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Donation Type</label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-100">
                                    <option>Zakat</option>
                                    <option>Infaq</option>
                                    <option>Sadaqah</option>
                                </select>
                            </div>
                            <button type="button" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                Donate Now
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-16 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in dark:text-white">Our Community in Action</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 animate-fade-in dark:bg-gray-800 dark:border-gray-700">
                            <img src="https://source.unsplash.com/random/400x300/?mosque" alt="Gallery" className="w-full h-48 object-cover" />
                        </div>
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 animate-fade-in dark:bg-gray-800 dark:border-gray-700">
                            <img src="https://source.unsplash.com/random/400x300/?prayer" alt="Gallery" className="w-full h-48 object-cover" />
                        </div>
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 animate-fade-in dark:bg-gray-800 dark:border-gray-700">
                            <img src="https://source.unsplash.com/random/400x300/?community" alt="Gallery" className="w-full h-48 object-cover" />
                        </div>
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 animate-fade-in dark:bg-gray-800 dark:border-gray-700">
                            <img src="https://source.unsplash.com/random/400x300/?charity" alt="Gallery" className="w-full h-48 object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">MasjidCMS</h3>
                            <p className="text-sm text-gray-400">Connecting our community through faith, education, and charity.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="#home"
                                        className="text-sm text-gray-400 hover:text-white"
                                        onClick={(e) => scrollToSection(e, 'home')}
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#about"
                                        className="text-sm text-gray-400 hover:text-white"
                                        onClick={(e) => scrollToSection(e, 'about')}
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#prayer"
                                        className="text-sm text-gray-400 hover:text-white"
                                        onClick={(e) => scrollToSection(e, 'prayer')}
                                    >
                                        Prayer Times
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#events"
                                        className="text-sm text-gray-400 hover:text-white"
                                        onClick={(e) => scrollToSection(e, 'events')}
                                    >
                                        Events
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                            <p className="text-sm text-gray-400">123 Masjid Street, City, Country</p>
                            <p className="text-sm text-gray-400">Email: info@masjidcms.org</p>
                            <p className="text-sm text-gray-400">Phone: +123 456 7890</p>
                            <div className="flex space-x-4 mt-4">
                                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
                                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                        <p className="text-sm text-gray-400">&copy; 2025 MasjidCMS. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Add Tailwind CSS animation */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 1s ease-in-out;
                }
            `}</style>
        </>
    );
}