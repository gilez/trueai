import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = ({ title, subtitle, ctaText, ctaLink }) => {
    const [text, setText] = React.useState("Trustworthy");
    const [fade, setFade] = React.useState(true);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setText(prev => prev === "Trustworthy" ? "Resource-efficient" : "Trustworthy");
                setFade(true);
            }, 500);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden pt-20">
            {/* Background Effects - Enhanced for both light and dark modes */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {/* Primary gradient blob - emerald/green tones */}
                <div className="absolute -top-[20%] left-[20%] h-[500px] w-[500px] rounded-full bg-primary/30 dark:bg-primary/20 blur-[120px] animate-pulse-slow" />

                {/* Secondary gradient blob - blue tones for light mode, purple for dark mode */}
                <div className="absolute top-[40%] -right-[10%] h-[450px] w-[450px] rounded-full bg-blue-400/40 dark:bg-purple-500/25 blur-[120px] animate-float" />

                {/* Additional accent blob for more depth */}
                <div className="absolute bottom-[10%] left-[10%] h-[350px] w-[350px] rounded-full bg-cyan-400/30 dark:bg-blue-600/20 blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container-custom flex flex-col items-center text-center z-10">
                <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
                    <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm mb-6">
                        Ewha Womans University BK21
                    </span>
                </div>

                <h1 className="animate-slide-up opacity-0 max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl mb-6" style={{ animationDelay: '0.2s' }}>
                    <span className={`transition-opacity duration-500 block mb-2 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                        {text} <span className="text-gradient-primary">AI</span>
                    </span>
                    <span className="block text-foreground">Research & Education</span>
                </h1>

                <p className="animate-slide-up opacity-0 max-w-2xl text-lg text-muted-foreground mb-10" style={{ animationDelay: '0.3s' }}>
                    {subtitle || "Leading the future of Artificial Intelligence with a focus on trustworthiness, ethics, and human-centric innovation."}
                </p>

                <div className="animate-slide-up opacity-0 flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.4s' }}>
                    <Link
                        to={ctaLink || "/research"}
                        className="group flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-primary/90 hover:scale-105"
                    >
                        {ctaText || "Explore Research"}
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        to="/about/vision"
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
                    >
                        About Us
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                <div className="h-10 w-6 rounded-full border-2 border-white/20 flex justify-center pt-2">
                    <div className="h-2 w-1 rounded-full bg-white/50" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
