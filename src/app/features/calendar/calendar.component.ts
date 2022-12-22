import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventAddArg, EventApi, EventClickArg} from "@fullcalendar/core";

import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from '@fullcalendar/list';

import {createEventId, INITIAL_EVENTS} from "../../shared/Utils/event-utils";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FormEventComponent} from "./form-event/form-event.component";
import {BehaviorSubject, Observable, of} from "rxjs";
import {EditEventComponent} from "./edit-event/edit-event.component";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{

  events1 = [];

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'title',
      center: '',
      right: 'addEventButton dayGridMonth,timeGridWeek,timeGridDay prev,next today'
    },
    customButtons:{
      addEventButton: {
        text: "add event",
        click: () => this.openModal()
      }
    },
    events:this.events1,
    weekends: true,
    editable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };
  currentEvents: EventApi[] = [];

  event$:BehaviorSubject<any> = new BehaviorSubject<any>(
    [{"id": 10, "title":"event 1","start": new Date()},
    {"id": 20, "title":"event 2","start": new Date()}


  ])


  constructor(private changeDetector: ChangeDetectorRef, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    //todo appel réseau pour récupérer les events
  }


  handleEventClick(clickInfo: EventClickArg) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "600px";
    dialogConfig.maxWidth = "80%";
    dialogConfig.data = clickInfo;
    const ref = this.dialog.open(EditEventComponent, dialogConfig)

    ref.afterClosed().subscribe(
      data => {
        console.log(data)
        const eventList = this.event$.getValue();
        const newEventList = []

        for(let i = 0; i<eventList.length; i++){

          if(eventList[i].id != data){
            //todo appel réseau pour delete
            newEventList.push(eventList[i])
          }
        }
        this.event$.next(newEventList)
      }
    )

  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "600px";
    dialogConfig.maxWidth = "80%";

    const ref = this.dialog.open(FormEventComponent, dialogConfig)
    ref.afterClosed().subscribe((data:any) => {
      if(data) {
        const newEvent = {
          id: createEventId(),
          title: data.title,
          start: data.start,
          end: data.end
        }

        const eventList = this.event$.getValue();
        //todo appel réseau pour add un event
        const newList = [...eventList, newEvent]

        this.event$.next(newList)


      }
    })


  }

}