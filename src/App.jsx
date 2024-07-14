import { useEffect, useId, useState } from 'react'
import './App.css'
import { TodoContextProvider } from './contexts/todo'
import TodoForm from './components/TodoForm'
import { Switch } from './components/ui/switch'
import { nanoid } from 'nanoid'

function App() {

  const [todos, setTodos] = useState([])

  // assigning features to the context provider functions
  const addTodo = (todo) => {
    setTodos((prev) => [{...todo, id: nanoid(), isCompleted: false }, ...prev])
  }
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? todo : prevTodo))
  }
  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, isCompleted: !prevTodo.isCompleted} : prevTodo))
  }

  // Dark mode Toggle
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev)
  }

  // using local stodage to store todos
  useEffect(() => {
    // first getItem in string format so that you can compare it with "[]", json comparison is not possible hence everytime localstorage will be empty
    const todos = JSON.parse(localStorage.getItem("todos") ? localStorage.getItem("todos") : "[]")
    const mode = JSON.parse(localStorage.getItem("mode") ? localStorage.getItem("mode") : "false")
    if(todos && todos.length){
      setTodos(todos)
    }
    if(mode){
      setDarkMode(mode)
    }
  }, [])

  // more than one useEffect to store todos in localstorage is fine and are often used in applications.
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  // actual change in theme
  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark')
    document.querySelector('html').classList.add(darkMode ? 'dark' : 'light')
    localStorage.setItem("mode", JSON.stringify(darkMode))
  }, [darkMode])

  const BackgroundImage = 'https://images.pexels.com/photos/242124/pexels-photo-242124.jpeg'
  return (
    <div
        className="w-full h-screen bg-cover bg-no-repeat dark:bg-black"
        style={{
            background: `${darkMode ? "linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6))" : "linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.3))"},url('${BackgroundImage}') center repeat`,
        }}
    >
      <div className='overflow-y-scroll h-full'>
        <TodoContextProvider value={{todos, addTodo, updateTodo, removeTodo, toggleComplete, darkMode, toggleDarkMode}}>
          <div className='w-full bg-transparent'>
            <div className='w-full flex justify-end p-5 fixed'>
              <div className='mr-3'> Dark Mode</div>
              <div>
                <Switch onClick={toggleDarkMode} className="shadow-md" checked={darkMode} />
              </div>
            </div>
            <TodoForm />
          </div>
        </TodoContextProvider>
      </div>
    </div>
  )
}

export default App
