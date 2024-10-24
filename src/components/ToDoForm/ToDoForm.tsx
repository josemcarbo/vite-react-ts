import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Props, useToDoForm } from './useToDoForm';

function ToDoForm(props: Props) {
  const { errors, register, handleSubmit, onSubmit, handleCancel } = useToDoForm(props);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '1rem',
          padding: '2rem 1rem',
          minWidth: '350px',
        }}>
          <h2>Create ToDo</h2>
          <TextField
            sx={{ width: '100%' }}
            required
            {...register('title')}
            label="Title"
            variant="outlined"
            error={!!errors.title?.message}
            helperText={errors.title?.message} />
          <Button
            sx={{ width: '100%' }}
            disabled={!!errors.title?.message}
            type='submit'
            variant="contained">Create</Button>
          <Button sx={{ width: '100%' }} variant="outlined" onClick={handleCancel}>Cancel</Button>
        </Grid>
      </form>
    </>
  )
}

export default ToDoForm
