import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
    children: string;
    className?: string;
}

const RevealText: React.FC<RevealTextProps> = ({ children, className }) => {
    const textRef = useRef<HTMLDivElement | null>(null);
    const [words, setWords] = useState<string[]>([]);

    // Split text into words
    useEffect(() => {
        const splitWords = children.split(' ');
        setWords(splitWords);
    }, [children]);

    // Apply GSAP animation on words
    useEffect(() => {
        if (!textRef.current) return;

        const wordElements = textRef.current.querySelectorAll('.word');

        gsap.fromTo(
            wordElements,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 100%',
                    end: 'bottom 30%',
                    scrub: true,
                },
            }
        );
    }, [words]);

    return (
        <div ref={textRef} className={className}>
            {words.map((word, index) => (
                <span key={index} className="inline-block word">
          {word}&nbsp;
        </span>
            ))}
        </div>
    );
};

export default RevealText;