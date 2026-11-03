import { Routes } from '@angular/router';
import { EventForm } from './event-form/event-form';
import { EventList } from './event-list/event-list';

export const routes: Routes = [
  { path: '', component: EventList, title: 'Eventos | Mural de Eventos' },
  { path: 'eventos/novo', component: EventForm, title: 'Cadastrar evento | Mural de Eventos' },
  { path: '**', redirectTo: '' },
];
