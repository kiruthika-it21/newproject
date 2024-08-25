import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'; // Import interactionPlugin
import dayGridPlugin from '@fullcalendar/daygrid';

interface EventItem {
  id: string;
  title: string;
  start: string;
}


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  Events: EventItem[] = [];
  calendarOptions: CalendarOptions;

  constructor() {
     this.calendarOptions = {
          plugins: [dayGridPlugin, interactionPlugin],
          initialView: 'dayGridMonth',
          dateClick: this.onDateClick.bind(this),
          events: this.Events
        };
    }

  ngOnInit() {
    const storedEvents = localStorage.getItem('calendarEvents');
    console.log('Stored events:', storedEvents); // Debugging: Log stored events
    if (storedEvents) {
      this.Events = JSON.parse(storedEvents);
    }

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      dateClick: this.onDateClick.bind(this),
       eventClick: this.onEventClick.bind(this),
      events: this.Events
    };
  }

  onDateClick(res: { dateStr: string }) {
    const eventTitle = prompt('Enter event title:');
    if (eventTitle) {
      const newEvent: EventItem = {
        id: String(Date.now()), // Generate unique id for the event
        title: eventTitle,
        start: res.dateStr
      };
      this.Events.push(newEvent);
      this.saveEventsToLocalStorage();
      this.calendarOptions.events = this.Events; // Update calendar events after adding a new event
    }
  }

    onEventClick(eventClickInfo: any) {
       const eventId = eventClickInfo.event.id;
       const eventIndex = this.Events.findIndex(event => event.id === eventId);
       if (eventIndex !== -1) {
         this.Events.splice(eventIndex, 1);
         this.saveEventsToLocalStorage();
         this.calendarOptions.events = this.Events; // Update calendar events after deleting the event
       }
     }

  saveEventsToLocalStorage() {
    localStorage.setItem('calendarEvents', JSON.stringify(this.Events));
    console.log('Events saved to local storage:', this.Events); // Debugging: Log saved events
  }
}
