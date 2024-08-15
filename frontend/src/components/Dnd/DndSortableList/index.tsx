'use client'

import { dndFamily } from '@/state/atoms'
import { SortableContext } from '@dnd-kit/sortable'
import clsx from 'clsx'
import { useAtom } from 'jotai'

const DndSortableList = ({
  id,
  parentId,
  createItem,
  formAttr,
  flex = false,
  direction = 'row'
}: {
  id: string
  parentId?: string
  createItem: (props?: any) => JSX.Element
  formAttr?: any
  flex?: boolean
  direction?: 'row' | 'col'
}) => {
  const [elements = []] = useAtom(dndFamily(id))
  const elementNodes = (formAttr ? elements.find((i) => i.id === parentId)[formAttr] : elements).map(createItem)

  return (
    <SortableContext items={elements.map((i: any) => i.id)}>
      {flex ? (
        <div className={clsx('flex items-start gap-4', direction === 'row' ? 'flex-row' : 'flex-col')}>
          {elementNodes}
        </div>
      ) : (
        elementNodes
      )}
    </SortableContext>
  )
}

export default DndSortableList
