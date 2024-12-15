'use client';

import {useEffect, useRef} from "react";
import {useMotionValue, useSpring, useInView} from "motion/react";

const AnimatedNumbers = ({value}: {value: number}) => {
    const ref = useRef<HTMLElement | null>(null);

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 3000 });
    const isInView = useInView(ref);

    useEffect(() => {
        if(isInView){
            motionValue.set(value);
        }
    }, [isInView, motionValue, value]);

    useEffect(() => {
        springValue.on("change", (latestValue) => {
            if(ref.current){
                ref.current.textContent = latestValue.toFixed(0);
            }
        })
    }, [springValue, value]);

    return (
        <span ref={ref}></span>
    )
}

export default AnimatedNumbers;