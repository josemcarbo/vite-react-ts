import { Box, Button, CircularProgress, Divider, Drawer, Pagination, PaginationItem } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useToDoList } from "./useToDoList"
import { Add, ArrowBack, ArrowForward } from "@mui/icons-material";
import ToDoCard from "../ToDoCard/ToDoCard";
import ToDoForm from "../ToDoForm/ToDoForm";

function ToDoList() {
  const {
    loading,
    todos,
    count,
    showModal,
    anchor,
    handlePagination,
    handleDeleteToDo,
    handleCompetedToDo,
    toggleDrawer,
    onCancel,
    onCreated
  } = useToDoList();

  return (
    <>
      {
        loading ? (
          <Box className="loading-box">
            <CircularProgress />
          </Box>
        )
          : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                <Button variant="outlined" className="button-add" endIcon={<Add />} onClick={toggleDrawer(true)}>Add</Button>
              </Box>
              <Divider sx={{ m: 2 }} orientation="vertical" variant="inset" component="div" />
              <Grid display="flex" justifyContent="center" alignItems="flex-start" flexWrap="wrap" gap="2rem">
                {todos.map((todo) => (
                  <ToDoCard key={todo.id} todo={todo} onDelete={handleDeleteToDo} onCompleted={handleCompetedToDo} />
                ))}
              </Grid>
              <Pagination
                sx={{ display: 'flex', justifyContent: 'center', position: 'sticky', bottom: 0, background: 'white', width: '100%', marginTop: 10, p: 3 }}
                color="primary"
                onChange={handlePagination}
                count={count}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: ArrowBack, next: ArrowForward }}
                    {...item}
                  />
                )}
              />
              <Drawer
                anchor={anchor}
                open={showModal}
                onClose={toggleDrawer(false)}
              >
                <ToDoForm onCancel={onCancel} onCreated={onCreated} />
              </Drawer>
            </>
          )
      }
    </>
  )
}

export default ToDoList
