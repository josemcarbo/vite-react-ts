import { Card, CardActions, CardContent, IconButton, Switch, Typography } from "@mui/material";
import "./ToDoCard.css";
import { Delete } from "@mui/icons-material";
import { Props, useToDoCard } from "./useToDoCard";


function ToDoCard({ todo, onDelete, onCompleted }: Props) {
  const { isCompleted, handleCompetedToDo, handleDeleteToDo } = useToDoCard({ todo, onDelete, onCompleted });

  return (
    <>
      <Card sx={{ minWidth: 225 }} className="card-container">
        <CardContent>
          <Typography sx={{ color: 'text.secondary', fontSize: 16, fontWeight: 500 }}>
            {todo.id}: {todo.title}
          </Typography>
        </CardContent>
        <CardActions className="card-actions">
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
