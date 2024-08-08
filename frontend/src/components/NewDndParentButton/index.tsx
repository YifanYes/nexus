'use client'

import { Button } from '@/components/Button'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import { dndFamily } from '@/state/components'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const NewDndParentButton = ({ id }: { id: string }) => {
  const [elements = [], setElements] = useAtom(dndFamily(id))
  const [parentName, setParentName] = useState('')
  const [showAddParentModal, setShowAddParentModal] = useState(false)

  const onAddParent = () => {
    if (!parentName) return
    setElements([
      ...elements,
      {
        id: `parent-${uuidv4()}`,
        title: parentName,
        items: []
      }
    ])
    setParentName('')
    setShowAddParentModal(false)
  }

  return (
    <>
      <Modal showModal={showAddParentModal} setShowModal={setShowAddParentModal}>
        <div className='flex flex-col w-full items-start gap-y-4'>
          <h1 className='text-gray-800 text-3xl font-bold'>Add Container</h1>
          <Input
            type='text'
            placeholder='Container Title'
            name='containername'
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
          />
          <Button onClick={onAddParent}>Add container</Button>
        </div>
      </Modal>
      <Button onClick={() => setShowAddParentModal(true)}>Add Container</Button>
    </>
  )
}

export default NewDndParentButton
