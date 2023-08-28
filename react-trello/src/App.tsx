import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { toDoState } from "./atom";
import Board from "./Components/Board";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100vw;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<{ boardName: string }>();
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      setToDos(prevToDos => {
        const boardCopy = [...prevToDos[source.droppableId]];
        const taskObj = boardCopy[source.index];

        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);
        return {
          ...prevToDos,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos(prevToDos => {
        const sourceBoard = [...prevToDos[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const targetBoard = [...prevToDos[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination.index, 0, taskObj);
        return {
          ...prevToDos,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        };
      });
    }
  };
  const onValid = ({ boardName }: { boardName: string }) => {
    setToDos(prevToDos => {
      return {
        ...prevToDos,
        [boardName]: [],
      };
    });
    setValue("boardName", "");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("boardName")} />
        <input type="submit" value="Create Board" />
      </form>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map(boardId => (
              <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
