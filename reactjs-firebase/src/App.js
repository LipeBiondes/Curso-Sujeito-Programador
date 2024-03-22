import { useState, useEffect } from 'react'
import { db } from './firebaseConnection'
import {
  collection,
  addDoc,
  getDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore'
import './app.css'

export default function App() {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [posts, setPosts] = useState([])
  const [idPost, setIdPost] = useState('')

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function loadPosts() {
      onSnapshot(collection(db, 'posts'), snapshot => {
        let list = []
        snapshot.forEach(doc => {
          list.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        })
        setPosts(list)
      })
    }
    loadPosts()
  }, [])

  async function handleAdd() {
    setLoading(true)

    if (idPost) {
      setIdPost('')
    }

    if (titulo === '' || autor === '') {
      setLoading(false)
      return alert('Preencha todos os campos')
    }

    await addDoc(collection(db, 'posts'), {
      titulo: titulo,
      autor: autor
    })
      .then(() => {
        console.log('Document successfully written!')
      })
      .catch(error => {
        console.error('Error writing document: ', error)
      })
    setTitulo('')
    setAutor('')
    setLoading(false)
  }

  async function handleSearch() {
    setLoading(true)

    if (idPost === '') {
      setLoading(false)
      return alert('Preencha o campo ID')
    }
    const postRef = doc(db, 'posts', idPost)

    await getDoc(postRef)
      .then(snapshot => {
        setPosts([
          {
            id: snapshot.id,
            titulo: snapshot.data().titulo,
            autor: snapshot.data().autor
          }
        ])
      })
      .catch(error => {
        console.log('Error getting document:', error)
      })
    setLoading(false)
  }

  async function handleGetPosts() {
    setLoading(true)
    let list = []

    const refPost = collection(db, 'posts')
    await getDocs(refPost)
      .then(snapshot => {
        snapshot.forEach(doc => {
          list.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        })
        setPosts(list)
      })
      .catch(error => {
        console.log('Error getting document:', error)
      })
    setLoading(false)
  }

  async function atualizarPost() {
    setLoading(true)
    if (idPost === '' || titulo === '' || autor === '') {
      setLoading(false)
      return alert('Preencha os campos')
    }

    const postRef = doc(db, 'posts', idPost)
    await updateDoc(postRef, {
      titulo: titulo,
      autor: autor
    })
      .then(() => {
        console.log('Document successfully updated!')
      })
      .catch(error => {
        console.error('Error updating document: ', error)
      })
    setPosts([
      {
        id: idPost,
        titulo: titulo,
        autor: autor
      }
    ])
    setIdPost('')
    setTitulo('')
    setAutor('')
    setLoading(false)
  }

  async function exluirPost(id) {
    setLoading(true)
    const postRef = doc(db, 'posts', id)
    await deleteDoc(postRef)
      .then(() => {
        console.log('Document successfully deleted!')
      })
      .catch(error => {
        console.error('Error removing document: ', error)
      })
    setLoading(false)
  }

  return (
    <div className="container">
      <label>Id do post: </label>
      <input
        type="text"
        placeholder="ID"
        value={idPost}
        onChange={e => {
          setIdPost(e.target.value)
        }}
        required
      />
      <label>Título: </label>
      <input
        type="text"
        placeholder="Digite o titulo"
        value={titulo}
        onChange={e => {
          setTitulo(e.target.value)
        }}
        required
      />
      <label>Autor</label>
      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={e => {
          setAutor(e.target.value)
        }}
        required
      />
      <br />
      <button onClick={handleAdd} disabled={loading}>
        Cadastrar
      </button>
      <br />
      <button onClick={handleSearch} disabled={loading}>
        Buscar post
      </button>
      <br />
      <button onClick={handleGetPosts} disabled={loading}>
        Buscar posts
      </button>
      <br />
      <button onClick={atualizarPost} disabled={loading}>
        Atualizar post
      </button>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>ID: {post.id}</strong>
            <br />
            <span>Titulo: {post.titulo}</span>
            <br />
            <span>Autor: {post.autor}</span>
            <br />
            <button onClick={() => exluirPost(post.id)} disabled={loading}>
              Exluir Post
            </button>
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  )
}
