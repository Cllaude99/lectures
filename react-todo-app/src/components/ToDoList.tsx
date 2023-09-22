import { useState } from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue } from "recoil";

enum categories {
  TO_DO = "TO_DO",
  DONE = "DONE",
  DOING = "DOING",
}

interface IToDo {
  text: string;
  category: categories;
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

interface IForm {
  toDo: string;
}

const ToDoList = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    setToDos((prev) => [
      ...prev,
      { category: categories.TO_DO, text: data.toDo },
    ]);
    setValue("toDo", "");
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(onValid)}>
        <input
          placeholder="Write a to do"
          {...register("toDo", { required: "Please write a To Do" })}
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((todo) => (
          <>
            <li key={todo.category}>{todo.text}</li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
