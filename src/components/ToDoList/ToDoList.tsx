import { Box, Button, CircularProgress, Drawer, Pagination, PaginationItem } from "@mui/material";
import { useToDoList } from "./useToDoList"
import { Add, ArrowBack, ArrowForward } from "@mui/icons-material";
import "./ToDoList.css";
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
              <Button variant="outlined" className="button-add" endIcon={<Add />} onClick={toggleDrawer(true)}>Add</Button>
              <section id="content">
                {todos.map((todo) => (
                  <ToDoCard key={todo.id} todo={todo} onDelete={handleDeleteToDo} onCompleted={handleCompetedToDo} />
                ))}
              </section>
              <section id="pagination">
                <Pagination
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
              </section>
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
