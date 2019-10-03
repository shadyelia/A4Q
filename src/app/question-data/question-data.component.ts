import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { IQuestion } from "../models/Interfaces/IQuestion";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-question-data",
  templateUrl: "./question-data.component.html",
  styleUrls: ["./question-data.component.scss"]
})
export class QuestionDataComponent implements OnInit {
  @Input() editMode: boolean = false;
  question: IQuestion;
  questionForm: FormGroup;
  tag = "";
  tages = [];
  answer = "";
  answers = [];
  $key = "";
  @Output() ended = new EventEmitter<boolean>();

  constructor(private db: AngularFireDatabase, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    if (this.editMode) this.fillForm();
  }

  createForm() {
    this.questionForm = this.fb.group({
      theQuestion: ["", Validators.required],
      tages: [[]],
      answers: [[]]
    });
  }

  fillForm() {
    let questionObject = localStorage.getItem("question");
    questionObject = JSON.parse(questionObject);

    if (questionObject) {
      this.questionForm.setValue({
        theQuestion: questionObject["theQuestion"]
          ? questionObject["theQuestion"]
          : "",
        tages: questionObject["tages"] ? questionObject["tages"] : [],
        answers: questionObject["answers"] ? questionObject["answers"] : []
      });
      this.tages = questionObject["tages"] ? questionObject["tages"] : [];
      this.answers = questionObject["answers"] ? questionObject["answers"] : [];
      this.$key = questionObject["$key"] ? questionObject["$key"] : "";
    }
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

  deleteTages(tag) {
    if (tag) {
      let index = this.tages.indexOf(
        tag
      );
      this.tages.splice(index, 1);
      this.questionForm.controls.tages.setValue(this.tages);
    }
  }

  deleteAnswers(answer) {
    let index = this.answers.indexOf(
      answer
    );
    this.answers.splice(index, 1);
    this.questionForm.controls.answers.setValue(this.answers);
  }

  save() {
    if (this.questionForm.valid) {
      if (this.editMode) {
        this.editQuestion();
      } else {
        this.saveQuestion();
      }
    }
  }

  saveQuestion() {
    this.question = this.questionForm.value;
    this.db.list("/Questions").push(this.question);
    this.questionForm.reset();
    this.ended.emit(true);
  }

  editQuestion() {
    this.question = this.questionForm.value;
    this.db.object("/Questions/" + this.$key).update(this.question);
    this.questionForm.reset();
    this.ended.emit(true);
  }




  close() {
    this.questionForm.reset();
    this.ended.emit(true);
  }
}
