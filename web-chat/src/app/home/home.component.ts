import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: string = localStorage.getItem('name');
  serviceId = 'ISe888de86dac94f7fb12c0c25e7028c14';
  flag = true;
  channelName: string;
  channelId: string;
  channels: any = [];
  searchResult = [];
  searchChannel = false;
  generalChannel;
  message: string;
  messages: any = [];
  constructor(private requestService: RequestService) {}

  ngOnInit() {
    // Retrieving previously created channels and adding their names in an array
    this.requestService.retrieveChannels(this.serviceId).subscribe(response => {
      response.channels.map(key => {
        this.channels.push(key.unique_name);
      });
    });
  }

  // Method to create channels
  createChannel() {
    this.requestService.createChannel(this.channelName, this.serviceId).subscribe();
  }

  // Changing flag to create or remove text field to switch between creating and searching channels
  changeFlag(boolean) {
    this.flag = boolean;
  }

  // Getting channel name and then retrieving channel by channel name and then getting channel id
  selectChannel(channelName) {
    this.requestService.retrieveChannelByName(this.serviceId, document.getElementById(channelName).innerHTML)
      .subscribe(response => this.requestService.addUserToChannel(this.serviceId, response.sid, this.name).subscribe(res => {
        this.channelId = response.sid;
      }));
  }

  getGeneralChannelByName() {
    this.requestService.retrieveChannelByName(this.serviceId, 'general')
      .subscribe(response => this.requestService.addUserToChannel(this.serviceId, response.sid, this.name).subscribe(res => {
        this.channelId = response.sid;
      }));
  }

  // Sending messages and also getting messages to display
  sendMessage() {
    this.requestService.sendMessage(this.serviceId, this.channelId, this.message).subscribe();
    this.getMessages();
  }

  // Getting messages of a channel
  getMessages() {
    this.messages = [];
    this.requestService.getMessages(this.serviceId, this.channelId).subscribe(response => {
      response.messages.map(key => {
        this.messages.push(key.body);
      });
    });
  }

  search() {
    this.requestService.retrieveChannels(this.serviceId).subscribe(response => {
      response.channels.map(key => {
        if (this.channelName === key.unique_name) {
          this.searchResult.push(key.unique_name);
        }
      });
    });
    // this.searchChannel = false;
    this.searchResult = [];
  }
  clearMsg(){
    this.messages=[];
  }
}




