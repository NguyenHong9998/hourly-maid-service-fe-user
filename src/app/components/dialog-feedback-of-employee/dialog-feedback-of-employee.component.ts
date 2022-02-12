import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '@env/environment';

export class OverviewFeedback {
  numberOfClient: number;
  detail: Array<any>;

  constructor(numberOfClient: number,
    detail: Array<any>) {
    this.numberOfClient = numberOfClient;
    this.detail = detail;
  }
}

export class Detail {
  numStar: number;
  numUser: number;
  percent: string;

  constructor(numStar: number,
    numUser: number,
    percent: string) {
    this.numStar = numStar;
    this.numUser = numUser;
    this.percent = percent;

  }
}

export class Feedback {
  content: string;
  username: string;
  avatarUser: string;
  voteNum: number;

  constructor(content: string,
    username: string,
    avatarUser: string,
    voteNum: number) {
    this.content = content;
    this.username = username;
    this.avatarUser = avatarUser;
    this.voteNum = voteNum;
  }
}
@Component({
  selector: 'app-dialog-feedback-of-employee',
  templateUrl: './dialog-feedback-of-employee.component.html',
  styleUrls: ['./dialog-feedback-of-employee.component.scss']
})

export class DialogFeedbackOfEmployeeComponent implements OnInit {
  title: any;
  stars: number[] = [1, 2, 3, 4, 5];
  overview = new OverviewFeedback(0, []);
  feedback !: Array<Feedback>;

  constructor(public dialogRef: MatDialogRef<DialogFeedbackOfEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public http: HttpClient) {
    this.title = data.elementName;
  }

  ngOnInit(): void {
    this.getOverviewFeedback();
    this.getListFeedback();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  getOverviewFeedback() {
    let params = new HttpParams()
      .set('user_id', this.data.employeeId);
    this.http.get(environment.apiUrl + "/feedback/overview", { params: params }).subscribe(data => {
      const numberOfClient = (data as any).data.num_user;
      const result = Array<Detail>();
      const detailList = (data as any).data.detail;
      for (let i = 0; i < detailList.length; i++) {
        const item = new Detail(detailList[i].num_star, detailList[i].num_user, detailList[i].percent);
        result.push(item);
      }
      this.overview = new OverviewFeedback(numberOfClient, result.reverse());
    })
  }

  getListFeedback() {
    let params = new HttpParams()
      .set('user_id', this.data.employeeId);
    this.http.get(environment.apiUrl + "/feedback", { params: params }).subscribe(data => {
      const result = Array<Feedback>();
      const detailList = (data as any).data;
      for (let i = 0; i < detailList.length; i++) {
        const item = new Feedback(detailList[i].content, detailList[i].username, detailList[i].avatar_user, detailList[i].vote_num);
        result.push(item);
      }
      this.feedback = result;
    })
  }
}
