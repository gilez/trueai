import React from 'react';
import Section from '../components/Section';
import Card from '../components/Card';
import { contentData } from '../data/bk21Data';

const SubPage = ({ type }) => {
    const data = type === 'greeting' ? contentData.about.greeting : contentData.about.vision;

    if (!data) return <div>Loading...</div>;

    return (
        <div className="pt-20">
            {/* Hero Banner for Subpage */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0" />
                <div className="container-custom relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
                        {data.title}
                    </h1>
                    <div className="h-1 w-20 bg-primary rounded-full" />
                </div>
            </section>

            <Section className="py-12">
                {type === 'greeting' ? (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                        <div className="md:col-span-2">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] group">
                                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                                <img
                                    src={`${import.meta.env.BASE_URL}${data.image?.replace(/^\//, '') || 'assets/nyangportrait.jpeg'}`}
                                    alt="Prof. Daehun Nyang"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mt-6 text-center">
                                <h3 className="text-xl font-bold">Prof. Daehun Nyang</h3>
                                <p className="text-primary font-medium text-sm">Director</p>
                            </div>
                        </div>
                        <div className="md:col-span-10">
                            <Card className="p-8 md:p-12">
                                <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-line">
                                    {data.content}
                                </div>
                            </Card>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <Card className="p-8 text-center">
                            <p className="text-xl md:text-2xl font-medium leading-relaxed">
                                {data.description}
                            </p>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.coreValues.map((value, index) => (
                                <Card key={index} className="p-6 hover:border-primary/50 transition-colors group">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl group-hover:bg-primary group-hover:text-white transition-colors">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                            <p className="text-muted-foreground">{value.desc}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </Section>
        </div>
    );
};

export default SubPage;
