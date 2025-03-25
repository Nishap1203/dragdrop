import React from "react";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function InnerCard({ id, name }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  console.log("Herere");
  

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-2 border border-gray-200 bg-gray-50 shadow-sm rounded-md cursor-move w-32 ${
        isDragging ? "opacity-50" : ""
      } hover:bg-green-50 transition-colors duration-200`}
    >
      {name}
    </div>
  );
}

function MainArea({ selectedCard, onDragEnd }) {
  if (!selectedCard) return <div className="flex-1 p-4">Select a card</div>;

  return (
    <div className="flex-1 p-4">
      <DndContext onDragEnd={onDragEnd}>
        <SortableContext
          items={selectedCard.innerCards.map((innerCard) => innerCard.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {selectedCard.innerCards.map((innerCard) => (
              <InnerCard
                key={innerCard.id}
                id={innerCard.id}
                name={innerCard.name}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default MainArea;
