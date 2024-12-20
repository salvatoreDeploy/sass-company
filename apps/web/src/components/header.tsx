import sassIcon from '@/assets/sass-icon.svg'
import Image from 'next/image'
import { ProfileButton } from './profile-button'
import { OrganizationSwitcher } from './organization-switcher'
import { Slash } from 'lucide-react'
import { ability } from '@/auth/auth'
import { Separator } from './ui/separator'
import { ThemeSwitcher } from './theme/theme-switcher'
import { ProjectSwtcher } from './project-swtcher'
import { PendingInvite } from './pending-invites/page'

export async function Header() {
  const permissions = await ability()

  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between ">
      <div className="flex items-center gap-3">
        <Image src={sassIcon} className="size-10" alt="Sass Icon" />

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <OrganizationSwitcher />

        {permissions?.can('get', 'Project') && <ProjectSwtcher />}
      </div>

      <div className="flex items-center gap-4">
        <PendingInvite />
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
