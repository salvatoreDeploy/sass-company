'use server'

export async function singinInWithEmailAndPassword(data: FormData) {
  console.log(Object.fromEntries(data))
}
