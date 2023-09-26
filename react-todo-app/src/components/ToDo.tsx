import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atom";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDos(prev =>
      prev.map(todo => {
        if (todo.id === id) {
          return { id: todo.id, text: todo.text, category: newCategory };
        } else {
          return todo;
        }
      })
    );
  };
  const removeToDo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos(prev => prev.filter(toDo => toDo.id !== id));
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button onClick={() => onClick(Categories.DOING)}>Doing</button>
      )}
      {category !== Categories.TO_DO && (
        <button onClick={() => onClick(Categories.TO_DO)}>To Do</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => onClick(Categories.DONE)}>Done</button>
      )}
      <button onClick={removeToDo}>delete</button>
    </li>
  );
}

export default ToDo;
