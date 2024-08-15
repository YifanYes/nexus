'use client'

import { DndArea } from '@/components/Dnd'
import { StructureSchema } from '@/components/Dnd/DndArea'
import Mission from '@/components/Mission'
import MissionCategory from '@/components/MissionCategory'
import NewDndParentButton from '@/components/NewDndParentButton'
import { dndFamily } from '@/state/atoms'
import { useAtom } from 'jotai'

const Home = () => {
  const [elements = [], setElements] = useAtom(dndFamily('test'))

  const getParentElement = (parent: any, children: any) => (
    <MissionCategory
      id={parent.id}
      title={parent.title}
      key={parent.id}
      onAdd={(newChild) => {
        const container = elements.find((item: any) => item.id === parent.id)
        if (!container) return
        container.items.push(newChild)
        setElements([...elements])
      }}
    >
      {children}
    </MissionCategory>
  )

  const getChildElement = (child: any) => <Mission title={child.title} id={child.id} key={child.id} />

  const schema: StructureSchema = {
    id: 'test',
    parent: { as: 'parent' },
    children: {
      as: 'child',
      from: 'items',
      config: {
        flex: true,
        direction: 'col'
      }
    },
    schematics: {
      parent: (parent: any, children?: any) => getParentElement(parent, children || parent.items.map(getChildElement)),
      child: getChildElement
    }
  }

  return (
    <div className='mx-auto max-w-7xl py-10'>
      <div className='flex items-center justify-between gap-y-2'>
        <h1 className='text-gray-800 text-3xl font-bold'>Dnd-kit Guide</h1>
        <NewDndParentButton id={schema.id} />
      </div>
      <div className='mt-10'>
        <div className='grid grid-cols-3 gap-6'>
          <DndArea schema={schema} />
        </div>
      </div>
    </div>
  )
}

export default Home
