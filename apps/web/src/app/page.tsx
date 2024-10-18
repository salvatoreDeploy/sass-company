import { auth } from '@/auth/auth'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const { me } = await auth()

  return <pre>{JSON.stringify(me, null, 2)}</pre>

  //return <Button>Conteudo</Button>
}
