import React from 'react'
import HyperText from './ui/hyper-text'

type AnimatedHeroTextProps = {
  text: string,
  className?: string,
  shouldCenter?: boolean
}

const AnimatedHeroText = ({ text, className = "", shouldCenter = false }: AnimatedHeroTextProps) => {
  return (
    <div className='w-full mx-auto py-2 flex items-center justify-center text-center overflow-hidden'>
      <h1 className={ `w-full text-dark dark:text-light font-extrabold capitalize ${className}` }>
        <HyperText text={ text } className='font-geistMono' shouldCenter={ shouldCenter } />
      </h1>
    </div>
  )
}

export default AnimatedHeroText