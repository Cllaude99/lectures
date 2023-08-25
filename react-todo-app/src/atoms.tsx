import { atom } from "recoil";

export interface IToDO {
  id: number;
  text: string;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<IToDO[]>({
  key: "toDo",
  default: [],
});
