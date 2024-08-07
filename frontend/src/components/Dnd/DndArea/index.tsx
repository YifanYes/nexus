'use client'

import useDnd from '@/hooks/useDnd'
import { DndContext, closestCenter } from '@dnd-kit/core'
import DndOverlay from '../DndOverlay'
import DndSortableList from '../DndSortableList'

export type StructureSchemaConfig = {
  flex: boolean
  direction: 'row' | 'col'
}

export type StructureSchemaChildren = {
  as: string
  from: string
  config?: StructureSchemaConfig
}

export type StructureSchemaParent = {
  as: string
  config?: StructureSchemaConfig
}

export type StructureSchemaSchematics = {
  [key: string]: (props?: any, children?: any) => JSX.Element
}

export type StructureSchema = {
  id: string
  parent: StructureSchemaParent
  children?: StructureSchemaChildren
  schematics: StructureSchemaSchematics
}

const DndArea = ({ schema }: { schema: StructureSchema }) => {
  const { sensors, activeId, parentConstructor, childrenConstructor, handleDragEnd, handleDragOver, handleDragStart } =
    useDnd({ schema })

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <DndSortableList
        id={schema.id}
        createItem={(parent) =>
          parentConstructor(
            parent,
            schema.children && childrenConstructor && (
              <DndSortableList
                id={schema.id}
                parentId={parent.id}
                formAttr={schema.children.from || 'items'}
                createItem={childrenConstructor}
                {...schema.children.config}
              />
            )
          )
        }
        {...schema.parent.config}
      />
      <DndOverlay id={schema.id} activeId={activeId} overlaySchema={schema.schematics} />
    </DndContext>
  )
}

export default DndArea
