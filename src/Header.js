import React from "react"

export default function Header( {text} ){
    return (
        <>
        <head>
            <link rel="stylesheet" href= "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></link>
            <link rel="stylesheet" href="style.css"></link>
        </head>
        <h1>
            {text}
        </h1>
        <link rel="stylesheet" href= "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></link>
        </>
    )
}