import React from 'react';
import facultyData from '../data/faculty.json';
import Hero from '../components/Hero';
import Section from '../components/Section';
import Card from '../components/Card';
import { Mail, BookOpen, User } from 'lucide-react';

const Faculty = () => {
    return (
        <>
            <Hero
                title="Our Faculty"
                subtitle="Meet the distinguished professors and researchers leading the TRUEAI vision."
                ctaText="Research Areas"
                ctaLink="/research"
            />

            <Section className="-mt-20 relative z-10">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {facultyData.map((member, index) => (
                        <Card
                            key={index}
                            className="animate-slide-up flex flex-col h-full"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="mb-6 flex items-center justify-center">
                                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-primary/20 bg-white/5">
                                    <img
                                        src={member.image || "/assets/professors/default.jpeg"}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-primary text-sm font-medium mb-1">{member.role}</p>
                                <p className="text-muted-foreground text-xs">{member.department}</p>
                            </div>

                            <div className="mt-auto space-y-4">
                                <div className="border-t border-white/10 pt-4">
                                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <BookOpen size={12} /> Research Areas
                                    </h4>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {member.researchAreas.map((area, i) => (
                                            <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/5">
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {member.email && (
                                    <div className="border-t border-white/10 pt-4 flex justify-center">
                                        <a
                                            href={`mailto:${member.email}`}
                                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            <Mail size={14} />
                                            {member.email}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>
        </>
    );
};

export default Faculty;
