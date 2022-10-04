import { useState, useRef, useEffect } from "react"
import CardList from "../Components/CardListComponent"
import { Form, Col, Button, Container, Row, Modal } from "react-bootstrap";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'
import ModalComponent from "../Components/ModalComponent";

export default function PlayerCardsPage() {

  const LOCAL_STORAGE_KEY_CARDS = 'valorantApp.cards'
  const [cards, setCards] = useState([])
  const searchRef = useRef();

  useEffect(()=>{
      const storedCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CARDS))
      if(storedCards) setCards(storedCards)   
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY_CARDS, JSON.stringify(cards))
  },[cards])

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
    if(show) setShow(false)
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

  const[show, setShow] = useState(false)
  const toggleModal = () => {setShow(!show)}

  return (
    <>
    <h1>Player Cards</h1>
    <Container>
        <Form>
          <Button onClick={toggleModal} className="m-2">Clear All</Button>
          <Button onClick={handleRetrieveAll} className="m-2">Retrieve All</Button>
          <Row>
            <Col><Form.Control ref={searchRef} placeholder="Search..." className="m-2" /></Col>
            <Col><Button onClick={handleSearch} variant="success" className="m-2" style={{ textAlign: "right" }}>Search</Button></Col>
          </Row>
          <CardList cards={cards} deleteCard={deleteCard} />
        </Form>
      </Container>
      {/* <Modal show={show} onHide={handleClose}> */}
      <Modal show={show} onHide={toggleModal}>
      <ModalComponent handleYes={handleClearAll} handleNo={toggleModal} title={"Confirmation"} body={"Are you sure you want to clear all the cards?"} />
      </Modal>
      </>
  )
}
