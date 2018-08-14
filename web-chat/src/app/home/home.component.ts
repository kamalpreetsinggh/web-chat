import { Component, OnInit } from '@angular/core';
import { APIIntegrationService } from '../APIIntegration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: string;
  serviceId = 'IS15360efb590d4d7b92462b0c4ea72e3b';
  flag = false;
  channelName: string;
  searchChannelName: string;
  channels: any = [];
  searchedChannels = [];
  joinedChannels = [];
  channelId: string;
  channel:any
  message: string;
  messages: any = [];
  constructor(private apiIntegrationService: APIIntegrationService, private router: Router) {
    this.name = localStorage.getItem('name');
  }

  // displaying joined channels
  ngOnInit() {
    this.apiIntegrationService.createChannel(this.serviceId, "general").subscribe()
    this.apiIntegrationService.addUserToChannel(this.serviceId, "general", this.name).subscribe();
    this.getJoinedUserChannels();
    if (document.getElementById("channelName")) {
      setInterval(() => {
        this.getMessages(document.getElementById("channelName").innerHTML);
      }, 1000)
    }
  }

  // Method to create channels
  createChannel() {
    if (this.channelName != undefined) {
      this.apiIntegrationService.createChannel(this.serviceId, this.channelName).subscribe();
    }
    else alert("Please Enter a valid channel name!");
  }

  // Method to search created channels
  search() {
    this.searchedChannels = [];
    this.apiIntegrationService.retrieveChannels(this.serviceId).subscribe(response => {
      response.channels.map(key => {
        if (this.searchChannelName === key.unique_name) {
          this.searchedChannels.push(key.unique_name);
        }
      });
    });
  }

  // Changing flag to create or remove text field for creating channels
  changeFlag() {
    this.flag = !this.flag;
  }

  // Joining users to channel
  joinChannel(channelName) {
    this.apiIntegrationService.addUserToChannel(this.serviceId, document.getElementById(channelName).innerHTML, this.name).subscribe(res => { console.log(res) })
  }

  // Finding joined channels and pushing into an array
  getJoinedUserChannels() {
    this.joinedChannels = [];
    this.apiIntegrationService.retrieveChannels(this.serviceId).subscribe(response => {
      response.channels.map(key1 => {
        this.channels.push(key1.unique_name);
        this.apiIntegrationService.getUserChannels(this.serviceId, this.name).subscribe(res => {
          res.channels.map(key2 => {
            if (key2.channel_sid === key1.sid) {
              this.joinedChannels.push(key1.unique_name);
            }
          })
        })
      })
    })
  }

  // Sending messages and showing messages
  sendMessage() {
    this.apiIntegrationService.sendMessage(this.serviceId, document.getElementById("channelName").innerHTML, this.message, this.name).subscribe();
    this.getMessages(document.getElementById("channelName").innerHTML);
  }

  // Getting messages of a channel
  getMessages(channelName) {
    this.channel=channelName
    // console.log(this.channel)
    // this.messages = [];
    this.apiIntegrationService.getMessages(this.serviceId, channelName).subscribe(response => {
     this.messages= response.messages
    });
  }

  //Signout from the app
  signout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}


