
const express = require('express')


const app=express()
app.use(express.json());

let events=[]
events.push(
    {   title:"Aerophilia",
        'desc':"showcasing the aero model",
        'image':"",
        capacity:200,
         
    })

events.push(
    {   title:"code blaze",
        'desc':"showcasing the coding skill",
        'image':"",
        capacity:100,
         
    })

events.push(
    {   title:"SSTH",
        'desc':"monitoring the school student ",
        'image':"",
        capacity:500,
         
    })

events.push(
    {   title:"DevHack",
        'desc':"36 hr hackthon",
        'image':"",
        capacity:300,
         
    })

events.push(
    {   title:"Competitative program",
        'desc':"coding",
        'image':"",
        capacity:200,
         
    })

app.get('/list-all',
    (req,res)=>{
    res.send(events)
});

app.post('/adding',
    (req,res)=>{
        let addition=req.body.addition
        events.push(addition)
        res.send(events)
        console.log(events)
    })

app.put('/updating',
    (req,res)=>{
        let updateEvent=req.body.updateEvent
        let eventIdx=events.findIndex((event)=>event.title==updateEvent.title)
        events[eventIdx]=updateEvent
        res.send(events)
    }
)

app.delete('/deleting',
    (req,res)=>{
        let deleteEvent=req.body.deleteEvent
        events=events.filter((event)=>event.title!=deleteEvent.title)
        res.send(events)
    }
)

let register=[]
register.push({
    name:"suma",
    event:"code blaze",
    email:"suma@gmail.com"
})
register.push({
    name:"mandara",
    event:"SSTH",
    email:"mandara@gmail.com"
})
register.push({
    name:"deepti",
    event:"Aerophilia",
    email:"deepti@gmail.com"
})

app.post('/registration',
    (req,res)=>{
        let reg=req.body.reg
        let regIdx=register.findIndex((r)=>r.email==reg.email)
        
        if(regIdx!=-1){
        console.log("user is exist")
        }else{
            register.push(reg)
            for(let i=0;i<events.length;i++){
                if(reg.event==events[i].title){
                    events[i].capacity+=1
                }
            }
        }
        console.log(events)
        res.send(register)
        
    }
)

let bookings = [
  {
    id: 1,
    participantName: "suma",
    email: "suma@gmail.com",
    phone: "1234567890",
    eventName: "Aerophilia",
    registrationDate: new Date().toISOString()
  },
  {
    id: 2,
    participantName: "suresh",
    email: "suresh@gmail.com",
    phone: "0987654321",
    eventName: "code blaze",
    registrationDate: new Date().toISOString()
  }
];

app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

app.post('/api/bookings', (req, res) => {
  const newBooking = req.body;
  newBooking.id = bookings.length + 1;
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

app.get('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const booking = bookings.find(b => b.id === bookingId);
  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});

app.put('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const bookingIndex = bookings.findIndex(b => b.id === bookingId);
  if (bookingIndex !== -1) {
    const updatedBooking = { ...bookings[bookingIndex], ...req.body };
    bookings[bookingIndex] = updatedBooking;
    res.json(updatedBooking);
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});

app.delete('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const bookingIndex = bookings.findIndex(b => b.id === bookingId);
  if (bookingIndex !== -1) {
    bookings.splice(bookingIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});

app.listen(3000,()=>{
    console.log("i have port 3000")
});


