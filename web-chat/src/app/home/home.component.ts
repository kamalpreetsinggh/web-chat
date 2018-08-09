import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string = localStorage.getItem("userName");
  private serviceId = 'IS41ef51643c3e4776a917e7eabf70a44a';
  flag = false;
  channelName: string;
  channelId: string;
  channels: any = [];
  message: string;
  messages = [];
  constructor(private requestService: RequestService) {
  }

  ngOnInit() {
    // this.requestService.createService().subscribe(Response => {
    //   this.serviceId = Response.sid;
    // });
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

  // Changing flag to create or remove text field on click for creating channels
  changeFlag() {
    this.flag = !this.flag;
  }

  // Getting channel name and then retrieving channel by channel name and then getting channel id
  selectChannel(channelName) {
    this.requestService.retrieveChannelByName(this.serviceId, document.getElementById(channelName).innerHTML)
      .subscribe(response => this.requestService.addUserToChannel(this.serviceId, response.sid, this.userName).subscribe(res => {
        this.channelId = response.sid;
      }));
  }

  // Sending messsages and also getting messages to display
  sendMessage() {
    this.requestService.sendMessage(this.serviceId, this.channelId, this.message).subscribe();
    this.getMessages();
  }

  // Getting messages of a channel
  getMessages() {
    this.requestService.getMessages(this.serviceId, this.channelId).subscribe(response => {

    });
  }

}




