import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atom";

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  span {
    flex: 1;
  }
  button {
    background-color: transparent;
    opacity: 0.3;
    &:hover {
      transition: opacity 0s ease-in;
      opacity: 1;
    }
  }
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${props =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${props =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
`;
interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

const DragabbleCard = ({
  toDoId,
  index,
  toDoText,
  boardId,
}: IDragabbleCardProps) => {
  const setToDos = useSetRecoilState(toDoState);
  const handleDelete = () => {
    setToDos(prevToDos => {
      const targetToDos = [...prevToDos[boardId]].filter(
        toDo => toDo.id !== toDoId
      );
      return {
        ...prevToDos,
        [boardId]: targetToDos,
      };
    });
  };

  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <>
          <Card
            isDragging={snapshot.isDragging}
            ref={magic.innerRef}
            {...magic.dragHandleProps}
            {...magic.draggableProps}
          >
            <span>{toDoText}</span>
            <button onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </Card>
        </>
      )}
    </Draggable>
  );
};

export default React.memo(DragabbleCard);
