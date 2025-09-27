import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header';
import useFetch from './useFetch';
import {Link} from  "react-router-dom";

//import './App.css'

function App() {
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchEvent, setSearchEvent] = useState([]);

  const {data, loading,error} = useFetch("https://meetup-app-beige-two.vercel.app/events");
  let events = [];
  
  
  if(filter === "Online") {
    events = data?.filter((type) => type.typeOfEvent == "online")
    } else if(filter === "Offline") {
    events = data?.filter((type) => type.typeOfEvent == "offline")
    } else {
      events = data;
  }
    
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredEvents = data?.filter((type) =>  (type.title.toLowerCase().split(" ").includes(query.toLowerCase())) || (type.eventTags.includes(query)));
    setSearchEvent(filteredEvents);
    
    
  }
  if(searchEvent.length > 0) {
    events = searchEvent;
  }
  

  return (
    <>
      <Header onSearch = {handleSearch}/><hr/>
      <main >
        <div className='container d-flex justify-content-between py-3'>
          <h1>Meetup Events</h1>
          <select className='dropdown btn btn-light' onChange={(e) => setFilter(e.target.value)}>
            <option value="" className='dropdown-item'>Select Event type</option>
            <option value="Online" className='dropdown-item'>Online</option>
            <option value="Offline" className='dropdown-item'>Offline</option>
            <option value="Both" className='dropdown-item'>Both</option>
          </select>
        </div>
        <div className='container'>
          <div className='row'>
          
          {events?.map((event) => (
                <div className='col-md-4 my-2'>
                <Link to={`/details/${event._id}`} style={{textDecoration:"none"}}>
                <div className="card" key={event._id}>
                    <img src= {event.frontImgUrl} className="card-img-top img-fluid" alt="event-poster"/>
                    <div className="card-img-overlay">
                    <button className="btn btn-light">{event.typeOfEvent} Event</button>
                    </div>
                    <div className="card-body">
                    <small>{event.startDateAndTime.date} | {event.startDateAndTime.time}</small>
                    <h3 className="card-text" >{event.title}</h3>
                    </div>
                  </div>
                </Link>
                </div>
              )
          )}
        
        </div>
                  
        </div>
        </main>
      
    </> 
  )
}

export default App;
