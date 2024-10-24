import MainLayout from './layouts/MainLayout'
import './App.css'
import ToDoList from './components/ToDoList/ToDoList'

function App() {
  return (
    <>
      <MainLayout>
        <ToDoList />
      </MainLayout>
    </>
  )
}

export default App
