import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // Import FullCalendarModule
import interactionPlugin from '@fullcalendar/interaction'; // Import interactionPlugin
import dayGridPlugin from '@fullcalendar/daygrid';
import { ReactiveFormsModule } from '@angular/forms';
import { EvaluationComponent } from './evaluation/evaluation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    CalendarComponent,
    EvaluationComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  }
