import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import HorizontalLine from '@/components/utils/HorizontalLine.tsx'

function Navigation() {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={'text-base font-normal'}>
              Integrations
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>
                <div className={'w-96 h-96 bg-accent/50 flex flex-col p-4'}>
                  <p>General</p>
                  <HorizontalLine/>
                </div>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  )
}

export default Navigation
