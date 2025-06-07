import express from 'express'
import { PrismaClient } from './generated/prisma/index.js'
import { Message } from '@mui/icons-material'
import cors from 'cors'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())
app.use(cors())



app.post('/usuarios',async (req, res) => {

   await prisma.user.create({
    data: {
        email:req.body.email,
        name:req.body.name,
        age:req.body.age
    },

  })

    res.status(201).json(req.body)

})

app.get('/usuarios', async (req, res) => {

const users = await prisma.user.findMany()

res.status(200).json(users)
})

app.put('/usuarios/:id',async (req, res) => {

   await prisma.user.update({
    where: {
         id:req.params.id
    },
    data: {
        email:req.body.email,
        name:req.body.name,
        age:req.body.age
    },

  })
    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id:req.params.id
        },
    })
    res.status(200).json({Message: "Usuário deletado com sucesso"})
})

app.listen(3000), () => {
    console.log('Servidor rodando em http://localhost:3000');
}
