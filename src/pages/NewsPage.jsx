import React, { useState, useEffect } from 'react';
import { Calendar, Award, Megaphone, Filter, Loader2 } from 'lucide-react';
import Hero from '../components/Hero';
import Section from '../components/Section';
import Card from '../components/Card';

const NewsPage = () => {
    const [filter, setFilter] = useState('all');
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

    // Normalize categories for filtering
    const newsItems = newsData.map(item => ({
        ...item,
        normalizedCategory: item.category ? item.category.toLowerCase() : 'other'
    }));

    const filteredNews = filter === 'all'
        ? newsItems
        : newsItems.filter(item => item.normalizedCategory === filter.toLowerCase());

    const categories = ['all', ...new Set(newsItems.map(item => item.normalizedCategory))];

    const getIcon = (category) => {
        switch (category) {
            case 'notice': return <Megaphone className="h-4 w-4" />;
            case 'seminar': return <Calendar className="h-4 w-4" />;
            case 'achievement': return <Award className="h-4 w-4" />;
            default: return <Megaphone className="h-4 w-4" />;
        }
    };

    return (
        <>
            <Hero
                title="News & Updates"
                subtitle="Latest announcements, research achievements, and events from our group."
                ctaText="Back to Home"
                ctaLink="/"
            />

            <Section className="-mt-20 relative z-10">
                {/* Filters */}
                <div className="mb-10 flex flex-wrap gap-3 justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${filter === cat
                                ? 'bg-primary text-black shadow-lg shadow-primary/20 scale-105'
                                : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* News Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        <div className="col-span-full flex justify-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        </div>
                    ) : filteredNews.length > 0 ? (
                        filteredNews.map((item, index) => (
                            <Card
                                key={item.id}
                                className="animate-slide-up flex flex-col overflow-hidden group hover:border-primary/50 transition-all"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Image */}
                                <div className="relative w-full aspect-video overflow-hidden bg-muted">
                                    {item.image ? (
                                        <img
                                            src={`${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}
                                    {/* Fallback icon if image fails to load */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-primary/10" style={{ display: item.image ? 'none' : 'flex' }}>
                                        {getIcon(item.normalizedCategory)}
                                    </div>

                                    {/* Category badge overlay */}
                                    <div className="absolute top-3 left-3">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-primary border border-primary/20 capitalize">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                        <Calendar size={12} />
                                        <span>{item.date}</span>
                                    </div>

                                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>

                                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-grow">
                                        {item.summary}
                                    </p>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-20">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-muted-foreground mb-4">
                                <Filter size={32} />
                            </div>
                            <p className="text-muted-foreground text-lg">No news found for this category.</p>
                        </div>
                    )}
                </div>
            </Section>
        </>
    );
};

export default NewsPage;
