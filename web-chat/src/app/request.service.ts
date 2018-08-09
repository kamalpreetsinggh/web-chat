import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  userName: string;
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic QUNlNDZjNWI0YzAyOTJhY2E5MDAxMzA1MGMyNjAzMGQ4NAo6ZTUzMjQyZjA1ZDA0ZTMyNmM2MWFlZWU1NjAwN2QxMjg='
    })
  };

  // // To set the name of user from gmail account 
  // setUserName(userName: string){
  //   this.userName=userName;
  // }

  // // To get the name of user from gmail account;
  // getUserName(){

  // }

  // To create service in web chat
  createService(): Observable<any> {
    return this.http.post<any>('https://chat.twilio.com/v2/Services', 'FriendlyName=GroupChat', this.httpOptions);
  }

  // To create channel in web chat
  createChannel(channelName: string, serviceId): Observable<any> {
    return this.http.post<any>('https://chat.twilio.com/v2/Services/' + serviceId + '/Channels',
      'UniqueName=' + channelName, this.httpOptions);
  }
  
  // To retrieve channel in web chat
  retrieveChannels(serviceId: string): Observable<any> {
    return this.http.get('https://chat.twilio.com/v2/Services/' + serviceId + '/Channels', this.httpOptions);
  }

  // To retrieve channel by channel name
  retrieveChannelByName(serviceId: string, ChannelName: string): Observable<any> {
    return this.http.get('https://chat.twilio.com/v2/Services/' + serviceId + '/Channels/' + ChannelName, this.httpOptions);
  }

  // To add users to channels
  addUserToChannel(serviceId: string, channelId: string, userName: string): Observable<any> {
    return this.http.post<any>('https://chat.twilio.com/v2/Services/' + serviceId + '/Channels/' + channelId + '/Members', 'Identity=' + userName, this.httpOptions);
  }

  // To send messages accross channels
  sendMessage(serviceId: string, channelId: string, message: string): Observable<any> {
    return this.http.post<any>("https://chat.twilio.com/v2/Services/" + serviceId + "/Channels/" + channelId + "/Messages", "Body=" + message, this.httpOptions);
  }

  //To get the chat messages of any channel
  getMessages(serviceId: string, channelId: string): Observable<any>{
    return this.http.get("https://chat.twilio.com/v2/Services/" + serviceId + "/Channels/" + channelId + "/Messages", this.httpOptions);
  }
}