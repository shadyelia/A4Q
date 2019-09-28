import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from '@angular/fire/database';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionDataComponent } from './question-data/question-data.component';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    QuestionsListComponent,
    QuestionDataComponent
  ],
  imports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
