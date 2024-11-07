import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertTriangle } from 'lucide-react'

export default function CreateOrganization() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create organization</h1>

      <form /* onSubmit={handleSubmit} */ className="space-y-4">
        {/* {success === false && message && (
          <Alert variant={'destructive'}>
            <AlertTriangle className="size-4" />
            <AlertTitle>Sing in failed</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )} */}

        <div className="space-y-1">
          <Label htmlFor="name">Organization Name</Label>
          <Input name="name" id="name" />

          {/* {errors?.name && (
            <p className="flex items-center justify-start text-xs font-medium text-red-500 dark:text-red-400">
              <AlertTriangle className="size-3" />
              {errors.name[0]}
            </p>
          )} */}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">E-mail Domain</Label>
          <Input
            name="email"
            type="text"
            id="domain"
            inputMode="url"
            placeholder="example.com"
          />

          {/*  {errors?.email && (
            <p className="flex items-center justify-start text-xs font-medium text-red-500 dark:text-red-400">
              <AlertTriangle className="size-3" />
              {errors.email[0]}
            </p>
          )} */}
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline space-x-2">
            <Checkbox
              name="shouldAttachUsersByDomain"
              id="shouldAttachUsersByDomain"
              className="translate-y-0.5"
            />
            <label htmlFor="shouldAttachUsersByDomain" className=" space-y-1">
              <span className="text-sm font-medium leading-none">
                Auto-join new members
              </span>
              <p className="text-sm text-muted-foreground">
                This will automatically invite all members with same e-mail
                domain to this organization
              </p>
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Save organization
        </Button>
      </form>
    </div>
  )
}
