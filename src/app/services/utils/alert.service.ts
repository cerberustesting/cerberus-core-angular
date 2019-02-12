import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
declare function scrollToId(id: string);

export class Alert {
  message?: string; // not mandatory, must be use however
  style: string; // mandatory
  duration: number; // 0 or less = sticky
  icon_class?: string;
  animationIn?: string;
  animationOut?: string;
  current_animation?: string;
  dismissable?: boolean;
}

// for developers : set to true in order to avoid the alerts to disappear
const debugMode = false;
const animationDuration = 500;

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertsList: Array<Alert> = new Array<Alert>();
  observableAlerts = new BehaviorSubject<Alert[]>(this.alertsList);

  constructor() { }

  displayMessage(alert: Alert) {
    // put the default config if empty
    if (!alert.animationIn) { alert.current_animation = "fadeInDown"; } else { alert.current_animation = alert.animationIn; }
    if (alert.dismissable === undefined) { alert.dismissable = true; }
    // add the message in the list, if it isn't a duplicate (same message)
    console.log('is present : '+this.isAlertPresent(alert));
    if (!this.isAlertPresent(alert)) {
      this.alertsList.push(alert);
      this.observableAlerts.next(this.alertsList);
      scrollToId("main-container");
      // if the duration isn't set to infinite
      if (!debugMode && alert.duration > 0) {
        var displayTime = setInterval(() => {
          this.closeMessage(alert, 0);
          clearInterval(displayTime);
        }, alert.duration)
      }
    }
  }

  closeMessage(alert: Alert, index: number) {
    // verify that the alert is still in the list, if so, delete it
    if (this.isAlertPresent(alert)) {
      if (!alert.animationOut) { alert.current_animation = "fadeOut"; } else { alert.current_animation = alert.animationOut; }
      var animationOutTime = setInterval(() => {
        if (this.isAlertPresent(alert)) {
          this.alertsList.splice(index, 1);
          this.observableAlerts.next(this.alertsList);
          clearInterval(animationOutTime);
        }
      }, animationDuration - 200)
    }
  }

  isAlertPresent(alert: Alert) {
    return this.alertsList.filter(a => a.message === alert.message).length > 0;
  }

  // GLOBAL ALERTS FUNCTIONS
  APIError(error) {
    var alert: Alert = {
      message: error.statusText,
      style: "alert-danger",
      duration: 0,
      animationIn: "fadeIn",
      dismissable: false
    }
    this.displayMessage(alert);
  }

}
