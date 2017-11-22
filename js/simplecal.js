function loadEvents() {
  var eventsString = localStorage["events"];
  if (typeof eventsString === "undefined") {
    eventsString = "[]";
  }
  var parsedEvents = JSON.parse(eventsString);

  var eventsArray = [];
  for (i in parsedEvents) {
    var parsedEvent = parsedEvents[i];
    var event = {
      id: parsedEvent.id,
      name: parsedEvent.name,
      location: parsedEvent.location,
      startDate: new Date(parsedEvent.startDate),
      endDate: new Date(parsedEvent.endDate)
    };
    eventsArray.push(event);
  }

  return eventsArray;
}

function saveEvents(data) {
  localStorage["events"] = JSON.stringify(data);
}

function editEvent(event) {
  $('#event-modal input[name="event-index"]').val(event ? event.id : '');
  $('#event-modal input[name="event-name"]').val(event ? event.name : '');
  $('#event-modal input[name="event-location"]').val(event ? event.location : '');
  $('#event-modal input[name="event-start-date"]').datepicker('update', event ? event.startDate : '');
  $('#event-modal input[name="event-end-date"]').datepicker('update', event ? event.endDate : '');
  $('#event-modal').modal();
}

function deleteEvent(event) {
  var dataSource = loadEvents();

  for(var i in dataSource) {
    if(dataSource[i].id == event.id) {
      dataSource.splice(i, 1);
      break;
    }
  }

  saveEvents(dataSource);

  $('#calendar').data('calendar').setDataSource(dataSource);
}

function saveEvent() {
  var event = {
    id: $('#event-modal input[name="event-index"]').val(),
    name: $('#event-modal input[name="event-name"]').val(),
    location: $('#event-modal input[name="event-location"]').val(),
    startDate: $('#event-modal input[name="event-start-date"]').datepicker('getDate'),
    endDate: $('#event-modal input[name="event-end-date"]').datepicker('getDate')
  };

  var dataSource = loadEvents();

  if(event.id) {
    for(var i in dataSource) {
      if(dataSource[i].id == event.id) {
        dataSource[i].name = event.name;
        dataSource[i].location = event.location;
        dataSource[i].startDate = event.startDate;
        dataSource[i].endDate = event.endDate;
      }
    }
  }
  else
  {
    var newId = 0;
    for(var i in dataSource) {
      if(dataSource[i].id > newId) {
        newId = dataSource[i].id;
      }
    }

    newId++;
    event.id = newId;

    dataSource.push(event);
  }

  saveEvents(dataSource);

  $('#calendar').data('calendar').setDataSource(dataSource);
  $('#event-modal').modal('hide');
}