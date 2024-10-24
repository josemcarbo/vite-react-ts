import { useState } from "react";
import * as service from "../../services/TodoService";
import { ToDo } from "../../types/Todo";

export type Props = {
  todo: ToDo;
  onDelete: () => void;
  onCompleted: () => void;
};

export function useToDoCard({ todo: { completed, id }, onDelete, onCompleted }: Props) {
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);

  const handleDeleteToDo = (_: any) => {
    service
      .removeById(id)
      .then(() => onDelete())
      .catch((e) => console.error(e));
  };

  const handleCompetedToDo = (_: any) => {
    setIsCompleted(!isCompleted);
    service
      .updateTodo(id, {completed: !isCompleted})
      .then(() => onCompleted())
      .catch((e) => console.error(e));
  };

  return {
    isCompleted,
    handleDeleteToDo,
    handleCompetedToDo,
  };
}
