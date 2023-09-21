import { useState } from "react";
import { useForm } from "react-hook-form";

const ToDoList = () => {
  const { register, handleSubmit } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input placeholder="Write a to do" {...register("toDo")} />
        <button>Add</button>
      </form>
    </div>
  );
};

export default ToDoList;
