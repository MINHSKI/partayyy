import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

import sampleData from '../../../app/data/sampleData';

class EventDashboard extends Component {
  state = {
    events: sampleData.events,
    isOpen: false
  }

  toggleIsOpenFlag = () => {
    this.setState(({isOpen}) => ({
      isOpen: !isOpen
      })
    )
  }

  render() {
    const {events, isOpen} = this.state;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button positive onClick={this.toggleIsOpenFlag} content="Create Event"/>
          {isOpen && <EventForm cancelFormOpen={this.toggleIsOpenFlag} />}
        </Grid.Column>
      </Grid>
    )
  }
}

export default EventDashboard;