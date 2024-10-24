import { Button, TextField } from '@mui/material';
import './ToDoForm.css';
import { Props, useToDoForm } from './useToDoForm';

function ToDoForm(props: Props) {
  const { errors, register, handleSubmit, onSubmit, handleCancel } = useToDoForm(props);

  return (
    <>
      <section id="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Create ToDo</h2>
          <TextField
            required
            {...register('title')}
            label="Title"
            variant="outlined"
            error={!!errors.title?.message}
            helperText={errors.title?.message} />
          <Button
            disabled={!!errors.title?.message}
            type='submit'
            variant="contained">Create</Button>
          <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
        </form>
      </section>
    </>
  )
}

export default ToDoForm
