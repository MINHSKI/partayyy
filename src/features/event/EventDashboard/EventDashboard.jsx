import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import cuid from 'cuid';
import sampleData from '../../../app/data/sampleData';

class EventDashboard extends Component {
  state = {
    events: sampleData.events,
    isOpen: false,
    selectedEvent: null
  }

  formOpenHandler = () => {
    this.setState({
      isOpen: true,
      selectedEvent: false
    })
  }

  formCancelHandler = () => {
    this.setState({
      isOpen: false
    })
  }

  addEventHandler = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    this.setState(({ events }) => ({
      events: [...events, newEvent],
      isOpen: false
    }))
  }

  handleSelectEvent = (evt,event) => {
    console.log(evt);
    console.log(event);

    this.setState({
      selectedEvent: event,
      isOpen: true
    })
  }

  handleUpdateEvent = (updatedEvent) => {
     this.setState(({events}) => ({
       events: events.map(event => {
         if(event.id === updatedEvent.id) {
           return {...updatedEvent} 
         } else {
           return event
         }
       }),
       isOpen: false,
       selectedEvent: null
     }))
  }

  handleDeleteEvent = (id) => {
    this.setState(({events}) => ({
      events: events.filter(e => e.id !== id)
    }))
  }

  render() {
    const {events, isOpen, selectedEvent} = this.state;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList 
            events={events} 
            selectEvent={this.handleSelectEvent} 
            deleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button 
            positive 
            onClick={this.formOpenHandler} 
            content="Create Event"
          />
          {isOpen && (
            <EventForm 
              key={selectedEvent ? selectedEvent.id : 0}
              selectedEvent={selectedEvent} 
              updateEvent={this.handleUpdateEvent}
              createEvent={this.addEventHandler} 
              cancelFormOpen={this.formCancelHandler} 
            />)
          }
        </Grid.Column>
      </Grid>
    )
  }
}

export default EventDashboard;