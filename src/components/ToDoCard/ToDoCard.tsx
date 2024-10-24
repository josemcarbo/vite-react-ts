import { Card, CardActions, CardContent, IconButton, Switch, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Props, useToDoCard } from "./useToDoCard";


function ToDoCard({ todo, onDelete, onCompleted }: Props) {
  const { isCompleted, handleCompetedToDo, handleDeleteToDo } = useToDoCard({ todo, onDelete, onCompleted });

  return (
    <>
      <Card sx={{
        width: 300,
        minHeight: 160,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <CardContent>
          <Typography sx={{ color: 'text.secondary', fontSize: 16, fontWeight: 500 }}>
            {todo.id}: {todo.title}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton aria-label="delete" onClick={handleDeleteToDo}>
            <Delete color="secondary" />
          </IconButton>
          <Switch checked={isCompleted} onChange={handleCompetedToDo} />
        </CardActions>
      </Card>
    </>
  )
}

export default ToDoCard
