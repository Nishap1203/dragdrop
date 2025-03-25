import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import SideBar from "./SideBar";
import MainArea from "./MainArea";

function Side() {
  const [cardsState, setCardsState] = useState([
    {
      id: "1",
      name: "Card 1",
      backgroundColor: "skyblue",
      innerCards: [
        { id: "1-1", name: "Inner Card 1-1" },
        { id: "1-2", name: "Inner Card 1-2" },
        { id: "1-3", name: "Inner Card 1-3" },
        { id: "1-4", name: "Inner Card 1-4" },
        { id: "1-5", name: "Inner Card 1-5" },
      ],
    },
    {
      id: "2",
      name: "Card 2",
      backgroundColor: "green",
      innerCards: [
        { id: "2-1", name: "Inner Card 2-1" },
        { id: "2-2", name: "Inner Card 2-2" },
      ],
    },
    {
      id: "3",
      name: "Card 3",
      backgroundColor: "pink",
      innerCards: [
        { id: "3-1", name: "Inner Card 3-1" },
        { id: "3-2", name: "Inner Card 3-2" },
        { id: "3-3", name: "Inner Card 3-3" },
        { id: "3-4", name: "Inner Card 3-4" },
      ],
    },
    {
      id: "4",
      name: "Card 4",
      backgroundColor: "yellow",
      innerCards: [
        { id: "4-1", name: "Inner Card 4-1" },
        { id: "4-2", name: "Inner Card 4-2" },
      ],
    },
  ]);

  const [selectedCardId, setSelectedCardId] = useState("1");

  const handleOuterDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    if (active.id !== over.id) {
      setCardsState((cards) => {
        const oldIndex = cards.findIndex((card) => card.id === active.id);
        const newIndex = cards.findIndex((card) => card.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return cards;

        const newCards = [...cards];
        const [removed] = newCards.splice(oldIndex, 1);
        newCards.splice(newIndex, 0, removed);
        return newCards;
      });
    }
  };

  const handleInnerDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    if (active.id !== over.id) {
      setCardsState((cards) => {
        const newCards = cards.map((card) => {
          if (card.id === selectedCardId) {
            const oldIndex = card.innerCards.findIndex(
              (innerCard) => innerCard.id === active.id
            );
            const newIndex = card.innerCards.findIndex(
              (innerCard) => innerCard.id === over.id
            );

            if (oldIndex === -1 || newIndex === -1) return card;

            const newInnerCards = [...card.innerCards];
            const [removed] = newInnerCards.splice(oldIndex, 1);
            newInnerCards.splice(newIndex, 0, removed);
            return { ...card, innerCards: newInnerCards };
          }
          return card;
        });
        return newCards;
      });
    }
  };

  return (
    
      <div className="flex min-h-screen bg-gray-100">
        <DndContext onDragEnd={handleOuterDragEnd}  modifiers={[restrictToFirstScrollableAncestor]}>
          <SortableContext
            items={cardsState.map((card) => card.id)}
            strategy={verticalListSortingStrategy}
          >
            <SideBar
              cards={cardsState}
              selectedCardId={selectedCardId}
              setSelectedCardId={setSelectedCardId}
            />
          </SortableContext>
        </DndContext>
        <MainArea
          selectedCard={cardsState.find((card) => card.id === selectedCardId) || { innerCards: [] }}
          onDragEnd={handleInnerDragEnd}
        />
      </div>
  );
}

export default Side;
