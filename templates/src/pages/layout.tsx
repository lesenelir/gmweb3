import React from 'react'

import LZIcon from '@/assets/lz.svg'
import AlignJustifyIcon from '@/components/icons/AlignJustifyIcon.tsx'

interface IProps {
  children: React.ReactNode
}

function Layout(props: IProps) {
  const { children } = props

  return (
    <>
      {/* PC Head */}
      <header className={'h-24 p-6 max-sm:hidden sm:flex flex-row gap-8 bg-blue-200'}>
        <div className={'flex flex-row items-center'}>
          <img src={LZIcon} alt="" width={40} height={40}/>
          <h1 className={'font-inter font-medium'}>GM Web3</h1>
        </div>

        <div className={'flex flex-row items-center gap-4 ml-16'}>
          <p>Integrations</p>
          <p>Documentation</p>
        </div>

        <div className={'flex flex-row items-center ml-auto'}>
          <p>Connect Wallet</p>
        </div>
      </header>


      {/* Mobile Head */}
      <header className={'sm:hidden max-sm:flex items-center justify-between h-20 p-6 bg-amber-100'}>
        <div className={'flex flex-row items-center'}>
          <img src={LZIcon} alt="" width={40} height={40}/>
          <h1 className={'font-inter font-medium'}>GM Web3</h1>
        </div>
        <AlignJustifyIcon/>
      </header>

      {/* Content */}
      {children}
    </>
  )
}

export default Layout
