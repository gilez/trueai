import React from 'react';
import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-black py-12 text-sm text-gray-400">
            <div className="container-custom">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <GraduationCap size={20} />
                            </div>
                            <span className="text-lg font-bold text-white">
                                Ewha<span className="text-primary">TRUEAI</span>
                            </span>
                        </div>
                        <p className="max-w-md leading-relaxed">
                            Ewha Womans University BK21 FOUR
                            <br />
                            Trustworthy AI Education & Research Group
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="/research" className="hover:text-primary transition-colors">Research Areas</a></li>
                            <li><a href="/faculty" className="hover:text-primary transition-colors">Faculty</a></li>
                            <li><a href="/news" className="hover:text-primary transition-colors">News & Notices</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <MapPin size={16} className="mt-1 shrink-0 text-primary" />
                                <span>
                                    52, Ewhayeodae-gil, Seodaemun-gu,
                                    <br />
                                    Seoul 03760, Korea
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone size={16} className="shrink-0 text-primary" />
                                <span>+82-2-3277-2114</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={16} className="shrink-0 text-primary" />
                                <span>contact@ewha.ac.kr</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs">
                    <p>&copy; {new Date().getFullYear()} Ewha Womans University BK21 TRUEAI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
