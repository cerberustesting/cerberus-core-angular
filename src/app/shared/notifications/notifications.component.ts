import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { INotification } from 'src/app/core/services/utils/notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationsComponent implements OnInit {

  private crossReference_StyleIcon = [
    {
      style: 'alert-success',
      icon: 'fa-check',
      title: 'Success'
    },
    {
      style: 'alert-danger',
      icon: 'fa-times',
      title: 'Error'
    },
    {
      style: 'alert-warning',
      icon: 'fa-exclamation',
      title: 'Warning'
    },
    {
      style: 'alert-info',
      icon: 'fa-info',
      title: 'Info'
    }
  ]

  constructor(
    public snackBar: MatSnackBar,
    public snackBarRef: MatSnackBarRef<NotificationsComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: INotification
  ) { }

  ngOnInit() { }

  /**
   * Close the snackbar method
   */
  public dismissSnackbar(): void {
    this.snackBar.dismiss();
  }

  /**
   * Return the Cross Reference to get from a style, its icon and title
   * 
   * @param style: NotificationStyle 
   * @returns: CR object with icon and title attribute
   */
  findCrossReferenceForStyle(style: string): any {
    return this.crossReference_StyleIcon.find(cr => cr.style == style);
  }
}
