import { Component, OnInit } from '@angular/core';
import { AlertService, Alert } from '../services/utils/alert.service';

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.scss']
})
export class HeaderbarComponent implements OnInit {

  constructor(private AlertService: AlertService) { }

  ngOnInit() {
  }

  debug() {
    this.AlertService.displayMessage(this.createARandomAlert());
  }

  createARandomAlert() {
    return {
      message: "message test " + Math.floor(Math.random() * (999999 - 100000)) + 100000,
      animationIn: "fadeInDown",
      animationOut: "fadeOut",
      style: "alert-info",
      duration: 5000
    }
  }


}
