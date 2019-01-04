import { Component } from '@angular/core';
import { AlertService, Alert } from './services/utils/alert.service';

export class AppSettings {
  public static API_endpoint='http://localhost:8080/Cerberus/';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() { }

  ngOnInit() { }
}
