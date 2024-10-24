import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as service from "../../services/TodoService";
import { ToDo } from "../../types/Todo";

export type Props = {
  onCancel: () => void;
  onCreated: () => void;
};

export function useToDoForm({ onCancel, onCreated }: Props) {
  const schema = yup
    .object({
      title: yup.string().min(5).required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: Partial<ToDo>) => {
    await service
      .create(data)
      .then(() => onCreated())
      .catch((e) => console.error(e));
  };

  const handleCancel = () => {
    onCancel();
  };

  return {
    register,
    onSubmit,
    errors,
    handleSubmit,
    handleCancel,
  };
}
