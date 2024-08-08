'use client'

import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '../Button'
import Input from '../Input'
import Modal from '../Modal'

const MissionCategory = ({
  id,
  children,
  title,
  description,
  onAdd
}: {
  id: UniqueIdentifier
  children?: React.ReactNode
  title?: string
  description?: string
  onAdd?: (newElement?: any) => void
}) => {
  const [showAddItemModal, setShowAddItemModal] = useState(false)
  const [itemName, setItemName] = useState('')

  const { attributes, setNodeRef, listeners, transform, transition, isDragging } = useSortable({
    id,
    data: { type: 'parent' }
  })

  const onAddItem = () => {
    if (!itemName) return
    onAdd?.({
      id: `child-${uuidv4()}`,
      title: itemName
    })
    setItemName('')
    setShowAddItemModal(false)
  }

  return (
    <>
      <Modal showModal={showAddItemModal} setShowModal={setShowAddItemModal}>
        <div className='flex flex-col w-full items-start gap-y-4'>
          <h1 className='text-gray-800 text-3xl font-bold'>Add Item</h1>
          <Input
            type='text'
            placeholder='Item Title'
            name='itemname'
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button onClick={onAddItem}>Add Item</Button>
        </div>
      </Modal>
      <div
        {...attributes}
        ref={setNodeRef}
        style={{
          transition,
          transform: CSS.Translate.toString(transform)
        }}
        className={clsx('w-full h-full p-4 bg-gray-50 rounded-xl flex flex-col gap-y-4', isDragging && 'opacity-50')}
      >
        <div className='flex items-center justify-between' {...listeners}>
          <div className='flex flex-col gap-y-1'>
            <h1 className='text-gray-800 text-xl'>{title}</h1>
            <p className='text-gray-400 text-sm'>{description}</p>
          </div>
        </div>

        {children}
        <Button variant='ghost' onClick={() => setShowAddItemModal(true)}>
          Add Item
        </Button>
      </div>
    </>
  )
}

export default MissionCategory
