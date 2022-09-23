import { useState, useRef } from "react"
import CardList from "../Components/CardListComponent"
import { Form, Col, Button, Container, Row } from "react-bootstrap";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'

export default function PlayerCardsPage() {

  const LOCAL_STORAGE_KEY_CARDS = 'valorantApp.cards'
  const [cards, setCards] = useState([])
  const searchRef = useRef();

  function deleteCard(id) {
    const newCards = cards.filter(card => {
      return card.id !== id
    })
    setCards(newCards)
  }

  function handleSearch(e) {
    const searchTerm = searchRef.current.value
    console.log(searchTerm + "the search term")
    const newCards = cards.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCards(newCards)
    searchRef.current.value = null
  }

  function handleClearAll(e) {
    setCards([])
    localStorage.removeItem(LOCAL_STORAGE_KEY_CARDS);
  }

  function handleRetrieveAll(e) {
    handleClearAll();
    console.log("retrieve all clicked")
    //get request to set cards
    const getData = async () => {
      console.log("sending get request")
      const responseData = await axios.get("https://valorant-api.com/v1/playercards")
      responseData.data.data.forEach(card => {
        const name = card.displayName
        const displayIcon = card.displayIcon
        const wideArt = card.wideArt
        const largeArt = card.largeArt
        setCards(prevCards => {
          return [...prevCards, { 
            name: name, id: uuidv4(), 
            displayIcon: displayIcon, 
            wideArt: wideArt,
            largeArt: largeArt  
          }]
        })
      })
    }
    getData();
  }

  return (
    <>
    <h1>Player Cards</h1>
    <Container>
        <Form>
          <Button onClick={handleClearAll} className="m-2">Clear All</Button>
          <Button onClick={handleRetrieveAll} className="m-2">Retrieve All</Button>
          <Row>
            <Col><Form.Control ref={searchRef} placeholder="Search..." className="m-2" /></Col>
            <Col><Button onClick={handleSearch} variant="success" className="m-2" style={{ textAlign: "right" }}>Search</Button></Col>
          </Row>
          <CardList cards={cards} deleteCard={deleteCard} />
        </Form>
      </Container>
      </>
  )
}
