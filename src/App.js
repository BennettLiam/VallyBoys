import Header from "./Header"
import SpraysPage from "./Pages/SpraysPage"
import PlayerCardsPage from "./Pages/PlayerCardsPage"
import AboutPage from "./Pages/AboutPage"
import VallyBoysPage from "./Pages/VallyBoysPage"
import MarioPage from "./Pages/MarioPage"
import { Route, Routes } from "react-router-dom"

function App() {

  // let Component
  // console.log(window.location.pathname)
  // switch (window.location.pathname) {
  //   case "/VallyBoys/PlayerCards":
  //     Component = PlayerCardsPage
  //     break
  //   case "/VallyBoys/Sprays":
  //     Component = SpraysPage
  //     break
  //   case "/VallyBoys/About":
  //     Component = AboutPage
  //     break
  //     default:
  //       Component = PlayerCardsPage
  // }

  //Retrieve cards on refresh
  // useEffect(() => {
  //   const storedCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CARDS))
  //   if(storedCards) setCards(prevCards =>{
  //     return [...prevCards,...storedCards]
  //   })
  // }, [])

  //Save todos
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  // }, [todos])

  // function toggleTodo(id) {
  //   const newTodos = [...todos]
  //   const todo = newTodos.find(todo => todo.id === id)
  //   todo.complete = !todo.complete
  //   setTodos(newTodos)
  // }

  
  // function handleAddTodo(e) {
  //   const name = todoNameRef.current.value
  //   if (name === '') return
  //   setTodos(prevTodos => {
  //     return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
  //   })
  //   todoNameRef.current.value = null
  // }
  

  // function handleClearTodos(e) {
  //   const newTodos = todos.filter(todo => !todo.complete)
  //   setTodos(newTodos)
  // }


  return (

    <>
    <Header text={"Valorant Cards"} />
      <Routes>
        <Route path="/VallyBoys" element={<VallyBoysPage />} />
        <Route path="/VallyBoys/About" element={<AboutPage />} />
        <Route path="/VallyBoys/PlayerCards" element={<PlayerCardsPage />} /> 
        <Route path="/VallyBoys/Sprays" element={<SpraysPage />} />  
        <Route path="/VallyBoys/Mario" element={<MarioPage />} />  
      </Routes>
    </>
  )
}

export default App;
