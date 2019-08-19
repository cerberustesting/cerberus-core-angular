import { Injectable } from '@angular/core';
import { INotification, Notification } from './notification.model';
import { NotificationsComponent } from 'src/app/shared/notifications/notifications.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

// NOTIFICATION DEFAULT CONFIGURATION
const defaultDismissable: boolean = true;
const defaultDuration: number = 5000;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification: INotification;
  private defaultClasses: Array<String>;

  //snack bar configuration
  snackBarConfiguration: MatSnackBarConfig<any>;

  constructor(private snackBar: MatSnackBar, ) {
    this.snackBarConfiguration = {
      horizontalPosition: 'end',
      panelClass: ['alert']
    }

    // default classes to be added to the snackbar
    this.defaultClasses = ['alert'];
  }

  createANotification(message: string, style: string, dismissable?: boolean, duration?: number) {
    // check parameters and assign default values
    if (!dismissable) { dismissable = defaultDismissable}
    if (!duration) { duration = defaultDuration}
    // pass data to the notification component 
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
