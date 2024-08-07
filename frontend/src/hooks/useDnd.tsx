'use client'

import { StructureSchema } from '@/components/Dnd/DndArea'
import { dndFamily } from '@/state/components'
import {
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

export type DNDType = {
  id: UniqueIdentifier
  title: string
  items: {
    id: UniqueIdentifier
    title: string
  }[]
}

const useDnd = ({ schema }: { schema: StructureSchema }) => {
  const [storedData, setStoredData] = useAtom(dndFamily(schema.id))
  const [elements, setElements] = useState<any>(storedData)
  const [activeId, setActiveId] = useState<UniqueIdentifier | undefined>(undefined)
  const parentType = schema.parent.as
  const childrenType = schema.children?.as || 'items'
  const parentConstructor = schema.schematics[parentType]
  const childrenConstructor = childrenType ? schema.schematics[childrenType] : () => <></>

  // Find the value of the items
  const findValueOfItems = (id: UniqueIdentifier | undefined, type: string) => {
    if (type === parentType) {
      return storedData.find((item: any) => item.id === id)
    }
    if (type === childrenType) {
      return storedData.find((container: any) => container.items.find((item: any) => item.id === id))
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragStart = (event: DragStartEvent) => setActiveId(event.active.id)

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!active || !over || active.id === over.id) {
      return
    }

    // Parent Sorting
    if (active.id.toString().includes(parentType) && over?.id.toString().includes(parentType)) {
      // Find the index of the active and over container
      const activeContainerIndex = storedData.findIndex((container: any) => container.id === active.id)
      const overContainerIndex = storedData.findIndex((container: any) => container.id === over.id)
      // Swap the active and over container
      let newItems = [...storedData]
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex)
      setElements(newItems)
    }

    // Handle Items Sorting
    if (active.id.toString().includes(childrenType) && over?.id.toString().includes(childrenType)) {
      // Find the active container and over container
      const activeContainer = findValueOfItems(active.id, childrenType)
      const overContainer = findValueOfItems(over.id, childrenType)

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return

      // Find the index of the active and over container
      const activeContainerIndex = storedData.findIndex((container: any) => container.id === activeContainer.id)
      const overContainerIndex = storedData.findIndex((container: any) => container.id === overContainer.id)

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex((item: any) => item.id === active.id)
      const overitemIndex = overContainer.items.findIndex((item: any) => item.id === over.id)
      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...storedData]
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        )

        setElements(newItems)
      } else {
        // In different containers
        let newItems = [...storedData]
        const [removeditem] = newItems[activeContainerIndex].items.splice(activeitemIndex, 1)
        newItems[overContainerIndex].items.splice(overitemIndex, 0, removeditem)
        setElements(newItems)
      }
    }

    // Handling Item Drop Into a Container
    if (active.id.toString().includes(childrenType) && over?.id.toString().includes(parentType)) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, childrenType)
      const overContainer = findValueOfItems(over.id, parentType)

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return

      // Find the index of the active and over container
      const activeContainerIndex = storedData.findIndex((container: any) => container.id === activeContainer.id)
      const overContainerIndex = storedData.findIndex((container: any) => container.id === overContainer.id)

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex((item: any) => item.id === active.id)

      // Remove the active item from the active container and add it to the over container
      let newItems = [...storedData]
      const [removeditem] = newItems[activeContainerIndex].items.splice(activeitemIndex, 1)
      newItems[overContainerIndex].items.push(removeditem)
      setElements(newItems)
    }
  }

  // This is the function that handles the sorting of the containers and items when the user is done dragging.
  const handleDragEnd = () => setActiveId(undefined)

  useEffect(() => {
    setStoredData(elements)
  }, [elements, setStoredData])

  console.log(elements)

  return {
    sensors,
    activeId,
    parentConstructor,
    childrenConstructor,
    handleDragEnd,
    handleDragOver,
    handleDragStart
  }
}

export default useDnd
