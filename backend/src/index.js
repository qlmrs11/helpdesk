const express = require('express')
const cors = require('cors')
const { randomUUID } = require('crypto')

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())

const TICKET_STATUSES = ['Not Yet Worked', 'Working on', 'Awaiting User Confirmation', 'Completed']
const TICKET_PRIORITIES = ['Low', 'Normal', 'High']
const TICKET_CATEGORIES = ['IT', 'HR']

const seedTickets = () => [
  {
    id: '309',
    title: 'VPN access',
    description: 'User cannot connect to the corporate VPN from home.',
    category: 'IT',
    priority: 'Normal',
    status: 'Not Yet Worked',
    comments: [],
  },
  {
    id: '308',
    title: 'Access card replacement',
    description: 'Employee lost access card and needs a new one.',
    category: 'HR',
    priority: 'Low',
    status: 'Completed',
    comments: [
      {
        id: 'c1',
        at: new Date().toISOString(),
        author: 'helper',
        text: 'Reissued card and updated records.',
      },
    ],
  },
  {
    id: '307',
    title: 'Software installation',
    description: 'Install Figma and VS Code with required extensions.',
    category: 'IT',
    priority: 'High',
    status: 'Awaiting User Confirmation',
    comments: [
      {
        id: 'c2',
        at: new Date().toISOString(),
        author: 'helper',
        text: 'Installation completed. Please confirm.',
      },
    ],
  },
  {
    id: '310',
    title: 'Laptop failed to boot',
    description: 'Device stuck on vendor logo; possibly disk issue.',
    category: 'IT',
    priority: 'High',
    status: 'Working on',
    comments: [
      {
        id: 'c3',
        at: new Date().toISOString(),
        author: 'helper',
        text: 'Diagnosing hardware; running tests.',
      },
    ],
  },
]

let tickets = seedTickets()

const findTicket = id => tickets.find(ticket => ticket.id === id)

const createTicket = ({ title, description, category, priority }) => {
  // Determine next numeric ID based on existing tickets
  const numericIds = tickets
    .map(t => Number(t.id))
    .filter(n => Number.isFinite(n))

  const currentMax = numericIds.length ? Math.max(...numericIds) : 300
  const nextId = String(currentMax + 1)

  return {
    id: nextId,
    title,
    description,
    category,
    priority,
    status: 'Not Yet Worked',
    comments: [],
  }
}

app.get('/', (_req, res) => {
  res.json({ message: 'Helpdesk API is running', endpoints: ['/health', '/tickets'] })
})

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/tickets', (_req, res) => {
  res.json(tickets)
})

app.get('/tickets/:id', (req, res) => {
  const ticket = findTicket(req.params.id)
  if (!ticket) {
    return res.status(404).json({ message: 'Ticket not found' })
  }
  res.json(ticket)
})

app.post('/tickets', (req, res) => {
  const { title, description, category, priority } = req.body ?? {}

  if (!title || !description || !category || !priority) {
    return res.status(400).json({ message: 'title, description, category and priority are required.' })
  }

  if (!TICKET_CATEGORIES.includes(category)) {
    return res.status(400).json({ message: `category must be one of: ${TICKET_CATEGORIES.join(', ')}` })
  }

  if (!TICKET_PRIORITIES.includes(priority)) {
    return res.status(400).json({ message: `priority must be one of: ${TICKET_PRIORITIES.join(', ')}` })
  }

  const ticket = createTicket({ title, description, category, priority })
  tickets = [...tickets, ticket]
  res.status(201).json(ticket)
})

app.patch('/tickets/:id', (req, res) => {
  const ticket = findTicket(req.params.id)
  if (!ticket) {
    return res.status(404).json({ message: 'Ticket not found' })
  }

  const { status, priority, category, title, description } = req.body ?? {}

  if (status && !TICKET_STATUSES.includes(status)) {
    return res.status(400).json({ message: `status must be one of: ${TICKET_STATUSES.join(', ')}` })
  }

  if (priority && !TICKET_PRIORITIES.includes(priority)) {
    return res.status(400).json({ message: `priority must be one of: ${TICKET_PRIORITIES.join(', ')}` })
  }

  if (category && !TICKET_CATEGORIES.includes(category)) {
    return res.status(400).json({ message: `category must be one of: ${TICKET_CATEGORIES.join(', ')}` })
  }

  if (title !== undefined && !title.trim()) {
    return res.status(400).json({ message: 'title cannot be empty' })
  }

  if (description !== undefined && !description.trim()) {
    return res.status(400).json({ message: 'description cannot be empty' })
  }

  Object.assign(ticket, {
    ...(status ? { status } : {}),
    ...(priority ? { priority } : {}),
    ...(category ? { category } : {}),
    ...(title !== undefined ? { title: title.trim() } : {}),
    ...(description !== undefined ? { description: description.trim() } : {}),
  })

  tickets = tickets.map(t => (t.id === ticket.id ? ticket : t))
  res.json(ticket)
})

app.post('/tickets/:id/comments', (req, res) => {
  const ticket = findTicket(req.params.id)
  if (!ticket) {
    return res.status(404).json({ message: 'Ticket not found' })
  }

  const { author, text } = req.body ?? {}

  if (!author || !text) {
    return res.status(400).json({ message: 'author and text are required.' })
  }

  const comment = {
    id: randomUUID().slice(0, 8),
    at: new Date().toISOString(),
    author,
    text,
  }

  ticket.comments.push(comment)
  tickets = tickets.map(t => (t.id === ticket.id ? ticket : t))

  res.status(201).json(ticket)
})

app.delete('/tickets/:id', (req, res) => {
  const ticket = findTicket(req.params.id)
  if (!ticket) {
    return res.status(404).json({ message: 'Ticket not found' })
  }

  tickets = tickets.filter(t => t.id !== ticket.id)
  res.status(204).send()
})

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`)
})
