import { Component, OnInit } from '@angular/core';
import { ipcRenderer } from 'electron';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  hide() {
    ipcRenderer.send('hide', {1: 'Yup'});
  }

  getUserData() {
    ipcRenderer.send('getUserData');
  }

}
