import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Section from '../components/Section';
import Card from '../components/Card';
import { ArrowRight, BookOpen, Users, Award, Calendar, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contentData } from '../data/bk21Data';

const Home = () => {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Add timestamp to prevent caching
                const response = await fetch(`${import.meta.env.BASE_URL}data/news.json?t=${new Date().getTime()}`);
                if (!response.ok) throw new Error('Failed to fetch news');
                const data = await response.json();
                // Sort by date descending
                const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setNewsData(sortedData);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const highlights = [
        {
            icon: <BookOpen className="text-primary" size={24} />,
            title: "Research Excellence",
            description: contentData.general.goals[0]
        },
        {
            icon: <Users className="text-primary" size={24} />,
            title: "World-Class Faculty",
            description: contentData.general.goals[1]
        },
        {
            icon: <Award className="text-primary" size={24} />,
            title: "Global Leadership",
            description: contentData.general.goals[2]
        }
    ];

    // Show top 6 news items
    const recentNews = newsData.slice(0, 6);

    return (
        <>
            <Hero
                title="Trustworthy AI Research & Education"
                subtitle="Ewha Womans University BK21 FOUR Program dedicated to shaping the future of ethical and reliable Artificial Intelligence."
            />

            {/* Latest News Section - Moved to Top */}
            <Section className="relative z-10 -mt-20">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Latest <span className="text-primary">News</span></h2>
                        <p className="text-muted-foreground">Updates from our research group</p>
                    </div>
                    <Link to="/news" className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <Loader2 className="animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-3">
                        {recentNews.map((news) => (
                            <Card key={news.id} className="group flex flex-col h-full overflow-hidden hover:border-primary/50 transition-all p-0">
                                {/* Image Container */}
                                <div className="relative w-full aspect-video overflow-hidden bg-muted">
                                    {news.image ? (
                                        <img
                                            src={`${import.meta.env.BASE_URL}${news.image.replace(/^\//, '')}`}
                                            alt={news.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-primary/5">
                                            <span className="text-4xl">📰</span>
                                        </div>
                                    )}
                                    <div className="absolute top-3 left-3">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-primary border border-primary/20 capitalize">
                                            {news.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="mb-3 text-lg font-semibold text-white group-hover:text-primary transition-colors line-clamp-2">
                                        {news.title}
                                    </h3>
                                    <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
                                        <Calendar size={14} />
                                        <span>{news.date}</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                <div className="mt-8 md:hidden text-center">
                    <Link to="/news" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                        View All News <ArrowRight size={16} />
                    </Link>
                </div>
            </Section>

            {/* Highlights Section - Moved Below News */}
            <Section>
                <div className="grid gap-6 md:grid-cols-3">
                    {highlights.map((item, index) => (
                        <Card key={index} className="flex flex-col gap-4 p-8 border-primary/20 bg-primary/5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section className="bg-gradient-to-b from-transparent to-primary/5">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-16 text-center backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

                    <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                        Join Our Research Group
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                        We are always looking for passionate students and researchers to join our team.
                        Explore our research areas and find your path in Trustworthy AI.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/contact"
                            className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-primary/90 hover:scale-105"
                        >
                            Contact Us
                        </Link>
                        <Link
                            to="/research"
                            className="rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                        >
                            View Research Areas
                        </Link>
                    </div>
                </div>
            </Section>
        </>
    );
};

export default Home;
