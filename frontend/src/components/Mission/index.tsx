'use client'

import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'

const Mission = ({ id, title }: { id: UniqueIdentifier; title: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: id,
    data: { type: 'child' }
  })
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transition,
        transform: CSS.Translate.toString(transform)
      }}
      className={clsx(
        'px-2 py-4 bg-white shadow-md rounded-xl w-full border border-transparent hover:border-gray-200 cursor-pointer',
        isDragging && 'opacity-50'
      )}
    >
      <div className='flex items-center justify-between'>{title}</div>
    </div>
  )
}

export default Mission
