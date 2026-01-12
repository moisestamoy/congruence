import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, CheckSquare, Wallet, PieChart, Menu, X } from 'lucide-react';
import { cn } from '../utils/cn';

export default function MainLayout() {
    const { i18n } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Auto-close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Tracker' },
        { path: '/finances', icon: Wallet, label: 'Finanzas' },
        { path: '/todo', icon: CheckSquare, label: 'ToDo' },
        { path: '/stats', icon: PieChart, label: 'Stats' },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
            {/* Top Navigation - Professional & Minimalist */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
                <div className="w-full px-8 h-14 flex items-center justify-between">

                    {/* Logo / Brand */}
                    <span className="font-bold text-lg tracking-tight">Congruence</span>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-neutral-400 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200",
                                    isActive
                                        ? "text-white"
                                        : "text-neutral-500 hover:text-neutral-300"
                                )}
                            >
                                {({ isActive }) => (
                                    <>
                                        <item.icon size={14} className={isActive ? "text-white" : "text-neutral-600"} />
                                        <span>{item.label}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Lang Toggle */}
                    <button
                        onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
                        className="text-xs font-bold text-neutral-600 hover:text-white transition-colors uppercase"
                    >
                        {i18n.language}
                    </button>
                </div>
            </nav>

            {/* Main Content Area - Full Width by default */}
            <main className="pt-20 pb-10 w-full">
                <Outlet />
            </main>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-3xl pt-24 px-8 md:hidden flex flex-col items-center animate-in fade-in duration-300">
                    <div className="flex flex-col gap-8 w-full max-w-sm">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-6 text-2xl font-medium transition-all p-4 rounded-2xl",
                                    isActive
                                        ? "text-white bg-white/10 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                        : "text-neutral-500 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon size={28} />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>

                    <div className="mt-auto mb-12 w-full max-w-sm">
                        <button
                            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
                            className="w-full py-4 rounded-xl border border-white/10 text-neutral-400 font-bold uppercase tracking-widest text-sm hover:bg-white/5 hover:text-white transition-colors"
                        >
                            Cambiar Idioma ({i18n.language.toUpperCase()})
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
