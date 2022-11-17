import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { SurveyComponent } from './survey/survey.component';
import { QuestionComponent } from './question/question.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { ResponseListComponent } from './response-list/response-list.component';
import { ResponseComponent } from './response/response.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateSurveyComponent,
    CreateQuestionComponent,
    SurveyComponent,
    QuestionComponent,
    SurveyListComponent,
    ResponseListComponent,
    ResponseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
