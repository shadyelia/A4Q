import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class QuestionService {
  constructor(private db: AngularFireDatabase) {}

  getQuestions() {
    return this.db
      .list(`/Questions`)
      .snapshotChanges()
      .pipe(
        map(items => {
          // <== new way of chaining
          return items.map(a => {
            const data = a.payload.val();
            const key = a.payload.key;
            return { key, data }; // or {key, ...data} in case data is Obj
          });
        })
      );
  }
}
