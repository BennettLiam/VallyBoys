import React from "react"
import { Card, Button } from "react-bootstrap"

export default function MarioComponent({ mario, deleteMario }) {
    function handleDeleteClick() {
        deleteMario(mario.id)
    }
    function fancyTimeFormat(duration) {
        // Hours, minutes and seconds
        var hrs = ~~(duration / 3600);
        var mins = ~~((duration % 3600) / 60);
        var secs = ~~duration % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }
    return (
        <Card style={{ maxWidth: "500px", textAlign: "center" }} text="white" bg="dark" border="light" className="m-2">
            {/* <Card.Img variant="top" src={mario.largeArt} alt={mario.name} /> */}
            <Card.Body>
                <Card.Title>{mario.place + " : " + fancyTimeFormat(mario.time)}</Card.Title>
                <Card.Text>
                    {mario.date + ": " + (mario.comment??'') + mario.weblink}
                    {console.log(mario.videoLink)}
                    {mario.videoLink&&<iframe width="448" height="252" src={mario.videoLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
                    
                    
                    <Card.Link href={mario.videoLink}>Web link</Card.Link>
                </Card.Text>
                <Button onClick={handleDeleteClick} variant="danger">Delete Mario</Button>
            </Card.Body>
        </Card>
    )
}