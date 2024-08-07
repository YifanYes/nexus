import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'

export const dndAtoms = atom<{ [key: string]: any[] }>({})

export const dndFamily = atomFamily((id: string) =>
  atom(
    (get) => get(dndAtoms)[id] || [],
    (get, set, arg: any) => {
      const prev = get(dndAtoms)
      set(dndAtoms, { ...prev, [id]: [...(arg ? arg : [])] })
    }
  )
)
