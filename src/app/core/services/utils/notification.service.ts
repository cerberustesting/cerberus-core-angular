import { Injectable } from '@angular/core';
import { Notification, NotificationStyle } from './notification.model';
import { NotificationsComponent } from 'src/app/shared/notifications/notifications.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

// NOTIFICATION DEFAULT CONFIGURATION
const defaultDismissable: boolean = true;
const defaultDuration: number = 5000;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private defaultClasses: Array<String>;

  //snack bar configuration object
  private snackBarConfiguration: MatSnackBarConfig<any>;

  constructor(
    private snackBar: MatSnackBar
  ) {
    this.snackBarConfiguration = {
      horizontalPosition: 'end',
      verticalPosition: "top"
    }
  }

  createANotification(message: string, style: NotificationStyle, dismissable?: boolean, duration?: number) {
    // check parameters and assign default values if necessary
    if (typeof dismissable == 'undefined') { dismissable = defaultDismissable }
    if (!duration) { duration = defaultDuration }

    // pass data to the notification component via configuration
    this.snackBarConfiguration.data = new Notification(message, style, dismissable, duration);

    // CSS class management
    this.resetDefaultClasses();
    // add the dismissable dashmix class if the alert is dismissable
    if (dismissable == true) { this.defaultClasses.push('alert-dismissable'); }
    // add the correct css class according to the style
    this.defaultClasses.push(style);
    //@ts-ignore : can't assign a 'string[]' to 'string || string[]' error
    this.snackBarConfiguration.panelClass = this.defaultClasses;

    // set the duration in the snackbar configuration
    this.snackBarConfiguration.duration = this.snackBarConfiguration.data.duration;

    // open the notification component with the updated configuration
    this.snackBar.openFromComponent(NotificationsComponent, this.snackBarConfiguration);
  }

  resetDefaultClasses() {
    // place here the css class to be added in any case
    this.defaultClasses = ['alert', 'mt-headerbar'];
  }
}