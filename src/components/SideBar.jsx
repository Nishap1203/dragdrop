import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function OuterCard({ id, name, backgroundColor, isSelected, onClick }) {
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
    backgroundColor: backgroundColor || "#f0f0f0",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-2 border border-gray-300 rounded-md cursor-move ${
        isSelected ? "ring-2 ring-blue-500" : ""
      } ${
        isDragging ? "opacity-50" : ""
      } hover:bg-green-100 transition-colors duration-200`}
      onClick={onClick}
    >
      {name}
    </div>
  );
}

function SideBar({ cards, selectedCardId, setSelectedCardId }) {
  return (
    <div className="w-60 p-2 border-r border-gray-300">
      <div className="space-y-2">
        {cards.map((card) => (
          <OuterCard
            key={card.id}
            id={card.id}
            name={card.name}
            backgroundColor={card.backgroundColor}
            isSelected={card.id === selectedCardId}
            onClick={() => setSelectedCardId(card.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
