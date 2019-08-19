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
  snackBarConfiguration: MatSnackBarConfig<any>;

  constructor(
    private snackBar: MatSnackBar
  ) {
    this.snackBarConfiguration = {
      horizontalPosition: 'end',
      // default dashmix class(es) to add to the snackbar
      panelClass: ['alert']
    }
  }

  createANotification(message: string, style: NotificationStyle, dismissable?: boolean, duration?: number) {
    // check parameters and assign default values if necessary
    if (typeof dismissable == 'undefined') { dismissable = defaultDismissable }
    if (!duration) { duration = defaultDuration }
    // pass data to the notification component via configuration
    this.snackBarConfiguration.data = new Notification(message, style, dismissable, duration);
    // add the dismissable dashmix class if the alert is dismissable
    //@ts-ignore
    if (dismissable == true) { this.snackBarConfiguration.panelClass.push('alert-dismissable') }
    // set the duration in the snackbar configuration
    this.snackBarConfiguration.duration = this.snackBarConfiguration.data.duration;
    //@ts-ignore
    this.snackBarConfiguration.panelClass.push(style);
    this.snackBar.openFromComponent(NotificationsComponent, this.snackBarConfiguration);
  }
}