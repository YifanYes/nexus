'use client'

import { dndFamily } from '@/state/components'
import { DragOverlay, UniqueIdentifier } from '@dnd-kit/core'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { StructureSchemaSchematics } from '../DndArea'

const DndOverlay = ({
  id,
  activeId,
  overlaySchema
}: {
  id: string
  activeId: UniqueIdentifier | undefined
  overlaySchema: StructureSchemaSchematics
}) => {
  const [elements = []] = useAtom(dndFamily(id))
  const [currentElement, setCurrentElement] = useState<any>()

  useEffect(() => {
    const parent = elements.find(
      (element: any) => element.id === activeId || element.items.find((item: any) => item.id === activeId)
    )
    const child = parent?.items.find((item: any) => item.id === activeId)
    setCurrentElement(child || parent)
  }, [activeId, elements])

  return (
    <DragOverlay adjustScale={false}>
      {Object.keys(overlaySchema).map(
        (key) => currentElement && activeId && activeId.toString().includes(key) && overlaySchema[key](currentElement)
      )}
    </DragOverlay>
  )
}

export default DndOverlay
