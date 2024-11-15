import { Header } from '@/components/header'

export default async function Home() {
  return (
    <div className="space-y-4 py-4">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <h1>Projetos | Texto para criar sua organização</h1>
      </main>
    </div>
  )
}
