'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import { useRouter } from 'next/router'
import { createOrganizationAction } from './actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, Loader2 } from 'lucide-react'

export function OrganizationForm() {
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    createOrganizationAction
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant={'destructive'}>
          <AlertTriangle className="size-4" />
          <AlertTitle>Sing in failed</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant={'success'}>
          <AlertTriangle className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Organization Name</Label>
        <Input name="name" id="name" />

        {errors?.name && (
          <p className="flex items-center justify-start text-xs font-medium text-red-500 dark:text-red-400">
            <AlertTriangle className="size-3" />
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="domain">E-mail Domain</Label>
        <Input
          name="domain"
          type="text"
          id="domain"
          inputMode="url"
          placeholder="example.com"
        />

        {errors?.domain && (
          <p className="flex items-center justify-start text-xs font-medium text-red-500 dark:text-red-400">
            <AlertTriangle className="size-3" />
            {errors.domain[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline space-x-2">
          <Checkbox
            name="shouldAttachUserByDomain"
            id="shouldAttachUserByDomain"
            className="translate-y-0.5"
          />
          <label htmlFor="shouldAttachUserByDomain" className=" space-y-1">
            <span className="text-sm font-medium leading-none">
              Auto-join new members
            </span>
            <p className="text-sm text-muted-foreground">
              This will automatically invite all members with same e-mail domain
              to this organization
            </p>
          </label>
        </div>

        {errors?.shouldAttachUserByDomain && (
          <p className="flex items-center justify-start text-xs font-medium text-red-500 dark:text-red-400">
            <AlertTriangle className="size-3" />
            {errors.shouldAttachUserByDomain[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save organiztaion'
        )}
      </Button>
    </form>
  )
}
