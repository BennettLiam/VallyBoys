import { useState, useRef, useEffect } from "react"
import MarioList from "../Components/MarioListComponent"
import { Form, Col, Button, Container, Row, Modal } from "react-bootstrap";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'
import ModalComponent from "../Components/ModalComponent";

export default function MariosPage() {

  const LOCAL_STORAGE_KEY_MARIOS = 'valorantApp.marios'
  const [marios, setMarios] = useState([])
  const searchRef = useRef();

  useEffect(()=>{
      const storedMarios = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_MARIOS))
      if(storedMarios) setMarios(storedMarios)   
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY_MARIOS, JSON.stringify(marios))
  },[marios])

  function deleteMario(id) {
    const newMarios = marios.filter(mario => {
      return mario.id !== id
    })
    setMarios(newMarios)
  }

  function handleSearch(e) {
    const searchTerm = searchRef.current.value
    console.log(searchTerm + "the search term")
    const newMarios = marios.filter(mario => mario.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setMarios(newMarios)
    searchRef.current.value = null
  }

  function handleClearAll(e) {
    setMarios([])
    localStorage.removeItem(LOCAL_STORAGE_KEY_MARIOS);
    if(show) setShow(false)
  }
  function youtubeConvert(str) {
    var res = str.split("=");
    var embeddedUrl = "https://www.youtube.com/embed/"+res[1];
    return embeddedUrl;
  }
  function twitchConvert(str) {
    var res = str.split("/");
    var embeddedUrl = "https://player.twitch.tv/?video="+res[res.length-1]+"&parent=www.bennettliam.github.io";
    return embeddedUrl;
  }

  function handleRetrieveAll(e) {
    handleClearAll();
    console.log("retrieve all clicked")
    //get request to set marios
    const getData = async () => {
      console.log("sending get request")
      const responseData = await axios.get("https://www.speedrun.com/api/v1/leaderboards/o1y9wo6q/category/n2y55mko")
      responseData.data.data.runs.slice(0,10).forEach(mario => {
        const place = mario.place
        const date = mario.run.date
        const comment = mario.run.comment
        const time = mario.run.times.primary_t
        const weblink = mario.run.weblink
        var videoLink = mario.run.videos.links['0'].uri;
        if(videoLink.includes('youtube')) videoLink=youtubeConvert(videoLink);
        if(videoLink.includes('twitch')) videoLink=twitchConvert(videoLink);
        setMarios(prevMarios => {
          return [...prevMarios, { 
            date: date, id: uuidv4(), 
            comment: comment,
            time: time,
            weblink: weblink,
            videoLink: videoLink,
            place: place
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
    <h1>Marios</h1>
    <Container>
        <Form>
          <Button onClick={toggleModal} className="m-2">Clear All</Button>
          <Button onClick={handleRetrieveAll} className="m-2">Retrieve All</Button>
          <Row>
            <Col><Form.Control ref={searchRef} placeholder="Search..." className="m-2" /></Col>
            <Col><Button onClick={handleSearch} variant="success" className="m-2" style={{ textAlign: "right" }}>Search</Button></Col>
          </Row>
          <MarioList marios={marios} deleteMario={deleteMario} />
        </Form>
      </Container>
      {/* <Modal show={show} onHide={handleClose}> */}
      <Modal show={show} onHide={toggleModal}>
      <ModalComponent handleYes={handleClearAll} handleNo={toggleModal} title={"Confirmation"} body={"Are you sure you want to clear all the marios?"} />
      </Modal>
      </>
  )
}
