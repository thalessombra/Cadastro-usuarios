
import { useEffect,useState, useRef } from 'react'
import {BsFillTrashFill} from 'react-icons/bs'
import api from '../services/api.js'
import styles from "./App.module.css"

function Home() {
  
  const [ users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()


async function getUsers() {
const usersApi = await api.get('/usuarios')

setUsers (usersApi.data)
}


async function createUsers() {

 await api.post('/usuarios', {
  name:inputName.current.value,
  age:inputAge.current.value,
  email:inputEmail.current.value
 })

 getUsers()
}



async function deleteUsers(id){
await api.delete(`/usuarios/${id}`)
getUsers()
}

useEffect(() => {
  getUsers()
}, [])

  return (
    
      <div className={styles.container}>
      <form className={styles.form}>
        <h1>Cadastro de usuários</h1>
        <input name='Nome' type='text' placeholder='Digite o nome do usuário' ref={inputName} />
        <input name='Email' type='email' placeholder='Digite o email' ref={inputEmail} />
        <input name='Idade' type='number' placeholder='Digite a idade' ref={inputAge} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>
{users.map(user => 
<div key={user.id} className={styles.card} >
        <div>
          <p>Nome: <span>{user.name}</span></p>
          <p>Idade: <span>{user.age}</span> </p>
          <p>Email:<span>{user.email}</span> </p>
        </div>
        <button onClick= {() => deleteUsers(user.id)}>
           <BsFillTrashFill />
        </button>
      </div>
)}

      
    
      </div>
        
    
  )
}

export default Home
