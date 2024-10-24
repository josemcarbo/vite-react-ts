import * as localStorageService from "./LocalStorageService";
import { endpoint } from "../config/endpoints";
import { ToDo } from "../types/Todo";

const handleResponse = async (response: Response, persistance: boolean) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const json: ToDo[] = ((await response.json()) as ToDo[]).sort(
    (a, b) => b.id - a.id
  );

  if (persistance) localStorageService.save("todos", json);

  return json;
};

const handlePagination = (items: ToDo[], page: number, perPage: number) => {
  return items.slice((page - 1) * perPage, (page - 1) * perPage + perPage);
};

export const getData = async (
  page: number = 1,
  perPage: number = 15,
  persistance: boolean = true
) => {
  try {
    const data = localStorageService.load("todos");
    const items: ToDo[] =
      (data as ToDo[]) ??
      (await handleResponse(await fetch(endpoint.TODO), persistance));

    return handlePagination(items, page, perPage);
  } catch (error) {
    throw error;
  }
};

export const removeById = async (id: number): Promise<void> => {
  try {
    const data = localStorageService.load("todos");
    const items: ToDo[] = (data as ToDo[]).filter((todo) => todo.id !== id);
    localStorageService.save("todos", items);
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async (id: number, data: Partial<ToDo>): Promise<void> => {
  try {
    const todos = localStorageService.load("todos");
    const items: ToDo[] = (todos as ToDo[]).map((todo) =>
      todo.id === id ? { ...todo, ...data } : todo
    );
    localStorageService.save("todos", items);
  } catch (error) {
    throw error;
  }
};

export const create = async (data: Partial<ToDo>): Promise<void> => {
  try {
    const items: ToDo[] = localStorageService.load("todos") as ToDo[];

    const newItem = {
      id: items[0].id + 1,
      completed: false,
      ...data,
    };

    localStorageService.save("todos", [newItem, ...items]);
  } catch (error) {
    throw error;
  }
};

export const getCount = async (): Promise<number> => {
  try {
    const items: ToDo[] = localStorageService.load("todos") as ToDo[];

    return items.length;
  } catch (error) {
    throw error;
  }
};
