import React from 'react';

const LayoutPage = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return (
    <div className={ `w-full h-full inline-block z-0 p-32 dark:bg-transparent xl:p-24 lg:p-16 md:p-12 sm:p-8  ${className}` }>
      { children }
    </div>
  )
}

export default LayoutPage