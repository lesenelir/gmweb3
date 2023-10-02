import React from 'react'

import { cn } from '@/lib/utils.ts'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu.tsx'

import LZIcon from '@/components/icons/LZIcon.tsx'
import GithubIcon from '@/components/icons/GithubIcon.tsx'
import TwitterIcon from '@/components/icons/TwitterIcon.tsx'
import AlignJustifyIcon from '@/components/icons/AlignJustifyIcon.tsx'
import Navigation from '@/components/layout/Navigation.tsx'
import ModeToggle from '@/components/layout/ModeToggle.tsx'
import HorizontalLine from '@/components/utils/HorizontalLine.tsx'

interface IProps {
  children: React.ReactNode
}

function Layout(props: IProps) {
  const { children } = props

  return (
    <>
      {/* PC Head */}
      <header className={'h-24 p-6 max-sm:hidden sm:flex flex-row gap-8'}>
        <div className={'flex flex-row items-center'}>
          <LZIcon width={40} height={40}/>
          <h1 className={'font-roboto font-medium'}>GM Web3</h1>
        </div>

        <div className={'flex flex-row items-center gap-4 ml-16'}>
          <Navigation/>
          <p className={cn(navigationMenuTriggerStyle(), 'group', 'text-base font-normal cursor-pointer')}>Documentation</p>
        </div>

        <div className={'flex flex-row items-center gap-4 ml-auto'}>
          <p className={cn(navigationMenuTriggerStyle(), 'group', 'text-base font-normal cursor-pointer')}>Connect Wallet</p>
          <ModeToggle/>
        </div>
      </header>
      <HorizontalLine/>

      {/* Mobile Head */}
      <header className={'sm:hidden max-sm:flex items-center justify-between h-20 p-6 bg-amber-100'}>
        <div className={'flex flex-row items-center'}>
          <LZIcon width={40} height={40}/>
          <h1 className={'font-inter font-medium'}>GM Web3</h1>
        </div>
        <AlignJustifyIcon/>
      </header>

      {/* Content */}
      {children}

      {/* Footer */}
      <HorizontalLine/>
      <footer className={'flex flex-col items-center p-4'}>
        <h3 className={'p-1'}>GMWeb3 - DApp Template</h3>
        <p className={'text-sm p-1'}> Built by Lesenelir</p>
        {/* footer icon */}
        <div className={'flex flex-row gap-4 p-2'}>
          <GithubIcon width={16} height={16}/>
          <TwitterIcon width={16} height={16}/>
        </div>
      </footer>
    </>
  )
}

export default Layout
