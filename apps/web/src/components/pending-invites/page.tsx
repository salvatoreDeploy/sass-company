'use client'

import { Check, UserPlus2, X } from 'lucide-react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPendingUserInvites } from '@/http/get-pending-user-invites'
import { useState } from 'react'
import { acceptInviteAction, rejectUserInviteAction } from './actions'

dayjs.extend(relativeTime)

export function PendingInvite() {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['pending-invites'],
    queryFn: getPendingUserInvites,
    enabled: isOpen,
  })

  async function handleAcceptInvite(inviteId: string) {
    await acceptInviteAction(inviteId)

    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  async function handleRejectInvite(inviteId: string) {
    await rejectUserInviteAction(inviteId)

    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <UserPlus2 className="size-4" />
          <span className="sr-only">Pending invites</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 space-y-2">
        <span className="block text-sm font-medium">
          Pending invites ({data?.invites.length ?? 0})
        </span>

        {data?.invites.length === 0 && (
          <p className="text-sm text-foreground">No invites found</p>
        )}

        {data?.invites.map((invite) => {
          return (
            <div key={invite.id} className="space-y-2">
              <p className=" text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  {invite.author?.name ?? 'Someone'}{' '}
                </span>
                invited you to join{' '}
                <span className="font-medium text-foreground">
                  {invite.organization.name}{' '}
                </span>
                <span className="text-xs">
                  {dayjs(invite.createdAt).fromNow()}
                </span>
              </p>

              <div className="flex gap-1">
                <Button
                  onClick={() => handleAcceptInvite(invite.id)}
                  size="xs"
                  variant="outline"
                >
                  <Check className="mr-1.5 size-3" />
                  Accept
                </Button>

                <Button
                  onClick={() => handleRejectInvite(invite.id)}
                  size="xs"
                  variant="ghost"
                >
                  <X className="mr-1.5 size-3" />
                  Reject
                </Button>
              </div>
            </div>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
