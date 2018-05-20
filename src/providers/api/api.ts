import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ApiProvider {
  url = "https://pleventz.co.uk/pleventz/api/";
  header = {
    headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
  };

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  login(email, password){
    let data = {
      email: email,  
      password: password
    }
    let params = this.urlParams(data);

    return new Promise ((resolve, reject) => {
      this.http.post(this.url + "login", params.toString(), this.header)
      .subscribe(res => {
        resolve(res);
        console.log(res);
      }, err => {
        console.log(err);        
      })
    })
  }
  register(email, password, forename, surname, username){
    let data = {
      email: email,
      password: password,
      forename: forename,
      surname: surname,
      username: username
    };
    let params = this.urlParams(data);
    
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "register", params.toString(), this.header)
      .subscribe(res => {
        resolve(res);
        console.log(res);
      },err => {
        console.log(err);
      })   
    })
  }
  updateProfile(user:any){
    let data = {
      email: user.email,
      forename: user.forename,
      password: user.password,
      surname: user.surname,
      username: user.username,
      user_id: user.user_id
    };
    let params = this.urlParams(data);

    return new Promise((resolve, reject) => {
      this.http.post(this.url + "updateProfile", params.toString(), this.header)
      .subscribe(res => {
        resolve(res);
        console.log(res);
      }, err => {
        console.log(err);
      })
    })
  }
  getEvents(){
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "getEvents").subscribe(res => {
        resolve(res);
        console.log(res);
      }, err => {
        console.log(err);
      })
    })
  }
  getCommentsByEventId(event_id){
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "getCommentsByEventId?event_id=" + event_id)
      .subscribe(res => {
        resolve(res);
        console.log(res);
      }, err => {
        console.log(err);
      })
    })
  }
  postComment(event_id, comment, date_added, username, user_id){
    let data = {
      event_id: event_id,
      comment: comment,
      date_added: date_added,
      username: username,
      user_id: user_id
    }
    let params = this.urlParams(data);

    return new Promise((resolve, reject) => {
      this.http.post(this.url + "postComment", params.toString(), this.header)
      .subscribe(res => {
        resolve(res);
        console.log(res);
      }, err => {
        console.log(err);
      })
    })
  }
  deleteComment(comment_id){
    let data = {
      comment_id: comment_id
    }
    let params = this.urlParams(data);

    return new Promise((resolve, reject) => {
      this.http.post(this.url + "deleteComment", params.toString(), this.header)
      .subscribe(res => {
        resolve(res);
        console.log(res);
      }, err => {
        console.log(err);
      })
    })
  }
  addResponse(event_id, user_id, response){
    let data = {
      event_id: event_id,
      user_id: user_id,
      response: response
    }
    let params = this.urlParams(data);

    return new Promise((resolve, reject) => {
      this.http.post(this.url + "addrespons", params.toString(), this.header)
      .subscribe(res => {
        resolve(res);
        console.log(res);
      }, err => {
        reject(err);
        console.log(err);
      })
    })
  }
  getResponse(event_id){
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "getResponse?event_id=" + event_id)
      .subscribe(res => {
        resolve(res);
        console.log(res);
      }, err => {
        reject(err);
        console.log(err);
      })
    })
  }

  urlParams(data){
    let params = new URLSearchParams();
    for(let key in data)
      params.set(key, data[key]);
    return params;
  }
}
