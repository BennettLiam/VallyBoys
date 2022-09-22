import { useState, useRef, useEffect } from "react"
import TodoList from "./TodoList"
import Header from "./Header"
import { v4 as uuidv4 } from 'uuid'
import CardList from "./CardList"
import axios from "axios"
import { type } from "@testing-library/user-event/dist/type"

const LOCAL_STORAGE_KEY = 'todoApp.todos'
const LOCAL_STORAGE_KEY_CARDS = 'valorantApp.cards'

function App() {
  const [todos, setTodos] = useState([])
  const [cards, setCards] = useState([])
  const todoNameRef = useRef();
  const searchRef = useRef();

  //Retrieve stored todos on refresh
  useEffect(()=>{
    // const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    // if(storedTodos) setTodos(prevTodos =>{
    //   return [...prevTodos,...storedTodos]
    // })
  },[])

  //Retrieve cards on refresh
  useEffect(()=>{
    // const storedCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CARDS))
    // if(storedCards) setCards(prevCards =>{
    //   return [...prevCards,...storedCards]
    // })
  },[])

  //Save todos
  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id===id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function deleteCard(id){
      const newCards = cards.filter(card => {
        return card.id!=id
      })
      setCards(newCards)
  }
  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if(name==='') return
    setTodos(prevTodos =>{
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleRetrieveAll(e){
    console.log("retrieve all clicked")
    //get request to set cards
    const getData = async () => {
      console.log("sending get request")
      const responseData = await axios.get("https://valorant-api.com/v1/playercards")
      console.log(responseData.data.data[0].displayName +" this is new") 
      responseData.data.data.forEach(card => {
        const name = card.displayName
        const image = card.displayIcon
        setCards(prevCards =>{
          return [...prevCards, {name: name, image: image, id: uuidv4()}]
        })
      })
    }
    getData();
  }

  function handleSearch(e){
    const searchTerm = searchRef.current.value
    console.log(searchTerm+"the search term")
    const newCards = cards.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCards(newCards)
    searchRef.current.value=null
  }

  function handleClearTodos(e){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function handleClearAll(e){
    setTodos([])
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setCards([])
    localStorage.removeItem(LOCAL_STORAGE_KEY_CARDS);
  }
  
  return (
    <>
    <Header text={"Valorant Cards"} />
    <CardList cards={cards} deleteCard={deleteCard} />
    <TodoList todos={todos} toggleTodo={toggleTodo} />
    <input ref={todoNameRef} type="text" />
    <input ref={searchRef} type="text" placeholder="Search..."/>
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed</button>
    <button onClick={handleClearAll}>Clear All</button>
    <button onClick={handleRetrieveAll}>Retrieve All</button>
    <button onClick={handleSearch}>Search</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
