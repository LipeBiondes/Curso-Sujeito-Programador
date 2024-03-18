import React, { useState, useEffect } from 'react'
import './style.css'

function RequestHttp() {
  const url = 'https://sujeitoprogramador.com/rn-api/?api=posts'
  const [nutri, setNutri] = useState([])
  useEffect(() => {
    function loadApi() {
      fetch(url)
        .then(response => response.json())
        .then(json => {
          setNutri(json)
          console.log(nutri)
        })
    }
    loadApi()
  }, [])
  return (
    <div className="container">
      <header>
        <strong>React Nutri</strong>
      </header>
      {nutri.map(item => {
        return (
          <article key={item.id} className="post">
            <strong className="titulo">{item.titulo}</strong>
            <p>{item.categoria}</p>
            <img src={item.capa} alt={item.titulo} className="imagem" />
            <p className="subtitulo">{item.subtitulo}</p>
            <a className="botao">Acessar</a>
          </article>
        )
      })}
    </div>
  )
}

export default RequestHttp
