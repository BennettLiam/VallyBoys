import { useState, useRef } from "react"
import SprayList from "../Components/SprayListComponent"
import { Form, Col, Button, Container, Row } from "react-bootstrap";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'

export default function SpraysPage() {

  const LOCAL_STORAGE_KEY_SPRAYS = 'valorantApp.sprays'
  const [sprays, setSprays] = useState([])
  const searchRef = useRef();

  function deleteSpray(id) {
    const newSprays = sprays.filter(spray => {
      return spray.id !== id
    })
    setSprays(newSprays)
  }

  function handleSearch(e) {
    const searchTerm = searchRef.current.value
    console.log(searchTerm + "the search term")
    const newSprays = sprays.filter(spray => spray.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setSprays(newSprays)
    searchRef.current.value = null
  }

  function handleClearAll(e) {
    setSprays([])
    localStorage.removeItem(LOCAL_STORAGE_KEY_SPRAYS);
  }

  function handleRetrieveAll(e) {
    handleClearAll();
    console.log("retrieve all clicked")
    //get request to set sprays
    const getData = async () => {
      console.log("sending get request")
      const responseData = await axios.get("https://valorant-api.com/v1/sprays")
      responseData.data.data.forEach(spray => {
        const name = spray.displayName
        const fullTransparentIcon = spray.fullTransparentIcon
        setSprays(prevSprays => {
          return [...prevSprays, { 
            name: name, id: uuidv4(), 
            fullTransparentIcon: fullTransparentIcon, 
          }]
        })
      })
    }
    getData();
  }

  return (
    <>
    <h1>Sprays</h1>
    <Container>
        <Form>
          <Button onClick={handleClearAll} className="m-2">Clear All</Button>
          <Button onClick={handleRetrieveAll} className="m-2">Retrieve All</Button>
          <Row>
            <Col><Form.Control ref={searchRef} placeholder="Search..." className="m-2" /></Col>
            <Col><Button onClick={handleSearch} variant="success" className="m-2" style={{ textAlign: "right" }}>Search</Button></Col>
          </Row>
          <SprayList sprays={sprays} deleteSpray={deleteSpray} />
        </Form>
      </Container>
      </>
  )
}
