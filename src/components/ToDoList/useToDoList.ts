import { ChangeEvent, useEffect, useState } from "react";
import * as service from "../../services/TodoService";
import { ToDo } from "../../types/Todo";

type Anchor = "top" | "left" | "bottom" | "right";

export function useToDoList() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const anchor: Anchor = "right";
  const perPage: number = 15;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (todos.length)
      service
        .getCount()
        .then((count) => setCount(Math.ceil(count / perPage)))
        .catch((e) => console.error(e));
  }, [todos]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await service.getData(page, perPage);
      setTodos(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteToDo = () => {
    fetchData();
  };

  const handleCompetedToDo = () => {
    fetchData();
  };

  const handlePagination = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setShowModal(open);
    };

  const onCancel = () => {
    setShowModal(false);
  };

  const onCreated = () => {
    setShowModal(false);
    fetchData();
  };

  return {
    count,
    todos,
    loading,
    showModal,
    anchor,
    handlePagination,
    handleDeleteToDo,
    handleCompetedToDo,
    toggleDrawer,
    onCancel,
    onCreated,
  };
}
