import sassIcon from '@/assets/sass-icon.svg'
import Image from 'next/image'
import { ProfileButton } from './profile-button'
import { OrganizationSwitcher } from './organiation-switcher'
import { Slash } from 'lucide-react'

export function Header() {
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src={sassIcon} className="size-10" alt="Sass Icon" />

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <OrganizationSwitcher />
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </div>
  )
}
