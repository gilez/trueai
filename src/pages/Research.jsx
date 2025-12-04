import React from 'react';
import { contentData } from '../data/bk21Data';
import Hero from '../components/Hero';
import Section from '../components/Section';
import Card from '../components/Card';
import { Target, Lightbulb, Shield, Cpu, Globe } from 'lucide-react';

const Research = () => {
    return (
        <>
            <Hero
                title="Research Vision"
                subtitle={contentData.general.vision}
                ctaText="Our Faculty"
                ctaLink="/faculty"
            />

            <Section className="-mt-20 relative z-10">
                <div className="grid gap-8 md:grid-cols-2">
                    <Card className="animate-slide-up h-full">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                <Target size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground">Our Goals</h2>
                        </div>
                        <ul className="space-y-4">
                            {contentData.general.goals.map((goal, index) => (
                                <li key={index} className="flex gap-3 text-muted-foreground">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary border border-primary/20">
                                        {index + 1}
                                    </span>
                                    <span>{goal}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card className="animate-slide-up h-full" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                <Lightbulb size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground">Core Tracks</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="p-4 rounded-xl bg-muted/50 border border-border">
                                <div className="flex items-center gap-3 mb-2">
                                    <Cpu className="text-primary" size={20} />
                                    <h3 className="text-lg font-semibold text-foreground">Efficient AI</h3>
                                </div>
                                <p className="text-sm text-muted-foreground pl-8">
                                    Focusing on lightweight models, optimization techniques, and hardware-aware AI to enable intelligence on resource-constrained devices.
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-muted/50 border border-border">
                                <div className="flex items-center gap-3 mb-2">
                                    <Shield className="text-primary" size={20} />
                                    <h3 className="text-lg font-semibold text-foreground">Security AI</h3>
                                </div>
                                <p className="text-sm text-muted-foreground pl-8">
                                    Researching adversarial defense mechanisms, privacy-preserving learning, and robust AI systems against malicious attacks.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </Section>

            <Section>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">Research Organization</h2>
                    <p className="text-muted-foreground">Structured for excellence in education and research</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {contentData.organization.committees.map((committee, index) => (
                        <Card key={index} className="text-center hover:-translate-y-1 p-6">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Globe size={20} />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">{committee.name}</h3>
                            <p className="text-xs text-muted-foreground">{committee.role}</p>
                        </Card>
                    ))}
                </div>
            </Section>
        </>
    );
};

export default Research;
