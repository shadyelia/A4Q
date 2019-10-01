import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { QuestionService } from "../services/question.service";

@Component({
  selector: "app-questions-list",
  templateUrl: "./questions-list.component.html",
  styleUrls: ["./questions-list.component.scss"]
})
export class QuestionsListComponent implements OnInit {
  questionFilter = "";
  page = 1;
  pageSize = 4;
  showQuestionData: boolean = false;
  editMode: boolean = false;
  collectionSize = 0;

  // get countries(): Country[] {
  //   return COUNTRIES.map((country, i) => ({ id: i + 1, ...country })).slice(
  //     (this.page - 1) * this.pageSize,
  //     (this.page - 1) * this.pageSize + this.pageSize
  //   );
  // }

  questions = [];

  constructor(
    private db: AngularFireDatabase,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    this.filldata();
  }

  filldata() {
    this.db
      .list("/Questions")
      .snapshotChanges()
      .subscribe(actions => {
        this.questions = [];
        actions.forEach(action => {
          const value = action.payload.val();
          const id = action.payload.key;
          const questionObject = {
            $key: id,
            theQuestion: value["theQuestion"],
            tages: value["tages"],
            answers: value["answers"]
          };
          this.questions.push(questionObject);
        });
        this.collectionSize = this.questions.length;
      });
  }

  showQuestion() {
    this.showQuestionData = true;
  }

  viewDetails(question) {
    localStorage.setItem("question", JSON.stringify(question));
    this.editMode = true;
  }

  delete($key) {
    this.db.object("/Questions/" + $key).remove();
  }

  closeQuestion($event: any) {
    this.showQuestionData = false;
    localStorage.setItem("question", undefined);
    this.editMode = false;
  }
}
