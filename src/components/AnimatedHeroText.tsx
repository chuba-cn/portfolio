import React from 'react'
import HyperText from './ui/hyper-text'

type AnimatedHeroTextProps = {
  text: string,
  className?: string
}

const AnimatedHeroText = ({ text, className = "" }: AnimatedHeroTextProps) => {
  return (
    <div className='w-full mx-auto py-2 flex items-center justify-center text-center overflow-hidden'>
      <h1 className={ `w-full text-dark font-extrabold capitalize text-5xl ${className}` }>
        {/* {
          text.split("").map((letter, index) => (
            <span key={ letter + "-" + index } className="inline-block">
              { letter }&nbsp;
            </span>
          ))
        } */}
        <HyperText text={ text } className='font-geistMono' />
      </h1>
    </div>
  )
}

export default AnimatedHeroText