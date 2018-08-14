import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class APIIntegrationService {
  userName: string;

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic QUNlNDZjNWI0YzAyOTJhY2E5MDAxMzA1MGMyNjAzMGQ4NAo6ZTUzMjQyZjA1ZDA0ZTMyNmM2MWFlZWU1NjAwN2QxMjg='
    })
  };

  // To create service in web chat
  createService(): Observable<any> {
    return this.http.post<any>('https://chat.twilio.com/v2/Services', 'FriendlyName=GroupChat', this.httpOptions);
  }

  // To create a channel in web chat
  createChannel(serviceId: string, channelName: string): Observable<any> {
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
  addUserToChannel(serviceId: string, channelName: string, userName: string): Observable<any> {
    return this.http.post<any>('https://chat.twilio.com/v2/Services/' + serviceId + '/Channels/' + channelName + '/Members',
      'Identity=' + userName, this.httpOptions);
  }

  // To get channels of an user
  getUserChannels(serviceId: string, userName: string): Observable<any> {
    return this.http.get('https://chat.twilio.com/v2/Services/' + serviceId + '/Users/' + userName + '/Channels', this.httpOptions);
  }

  // To send messages across channels
  sendMessage(serviceId: string, channelName: string, message: string, userName: string): Observable<any> {
    var body = new HttpParams().set('Unique Name', channelName).set('ServiceSid', serviceId).set('Body', message).set('From', userName)
    return this.http.post<any>('https://chat.twilio.com/v2/Services/' + serviceId + '/Channels/' + channelName + '/Messages',
      body.toString(), this.httpOptions);
  }

  // To get the chat messages of any channel
  getMessages(serviceId: string, channelId: string): Observable<any> {
    return this.http.get('https://chat.twilio.com/v2/Services/' + serviceId + '/Channels/' + channelId + '/Messages', this.httpOptions);
  }

}
