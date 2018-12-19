import { Component, OnInit } from '@angular/core';
import { Alert, AlertService } from 'src/app/services/utils/alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  alertsList: Array<Alert>;

  constructor(private AlertService: AlertService) { }

  ngOnInit() {
    this.AlertService.observableAlerts.subscribe(response => { this.alertsList = response; });
  }

}
