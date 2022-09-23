import Header from "./Header"
import SpraysPage from "./Pages/SpraysPage"
import PlayerCardsPage from "./Pages/PlayerCardsPage"
import AboutPage from "./Pages/AboutPage"

function App() {

  let Component
  console.log(window.location.pathname)
  switch (window.location.pathname) {
    case "/PlayerCards":
      Component = PlayerCardsPage
      break
    case "/Sprays":
      Component = SpraysPage
      break
    case "/About":
      Component = AboutPage
      break
      default:
        Component = PlayerCardsPage
  }

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
      <Component />
    </>
  )
}

export default App;
