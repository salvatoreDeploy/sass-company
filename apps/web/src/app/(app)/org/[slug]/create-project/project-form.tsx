'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import { useRouter } from 'next/router'
import { createProjectAction } from './actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { useParams } from 'next/navigation'
import { queryClient } from '@/lib/react-query'

export function ProjectForm() {
  const { slug: org } = useParams<{ slug: string }>()

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    createProjectAction,
    () => {
      queryClient.invalidateQueries({
        queryKey: [org, 'projects'],
      })
    }
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant={'destructive'}>
          <AlertTriangle className="size-4" />
          <AlertTitle>Save project failed</AlertTitle>
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
        <Label htmlFor="name">Project Name</Label>
        <Input name="name" id="name" />

        {errors?.name && (
          <p className="flex items-center justify-start text-xs font-medium text-red-500 dark:text-red-400">
            <AlertTriangle className="size-3" />
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" id="description" />

        {errors?.description && (
          <p className="flex items-center justify-start text-xs font-medium text-red-500 dark:text-red-400">
            <AlertTriangle className="size-3" />
            {errors.description[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save project'
        )}
      </Button>
    </form>
  )
}
