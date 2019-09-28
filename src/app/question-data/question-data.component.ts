import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { IQuestion } from '../models/Interfaces/IQuestion';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-question-data',
  templateUrl: './question-data.component.html',
  styleUrls: ['./question-data.component.scss']
})
export class QuestionDataComponent implements OnInit {
  question: IQuestion;
  questionForm: FormGroup;
  tag = "";
  tages = [];
  answer = "";
  answers = [];
  @Output() ended = new EventEmitter<boolean>();

  constructor(private db: AngularFireDatabase, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.questionForm = this.fb.group({
      theQuestion: ["", Validators.required],
      tages: [[]],
      answers: [[]]
    })
  }

  addTag() {
    this.tages.push(this.tag);
    this.questionForm.controls.tages.setValue(this.tages);
    this.tag = "";
  }

  addAnswer() {
    this.answers.push(this.answer);
    this.questionForm.controls.answers.setValue(this.answers);
    this.answer = "";
  }


  save() {
    if (this.questionForm.valid) {
      this.question = this.questionForm.value;
      this.questionForm.reset();
      this.db.list('/Questions').push(this.question);
      this.ended.emit(true);
    }
  }

}
