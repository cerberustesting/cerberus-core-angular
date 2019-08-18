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
      icon: 'fa-check'
    },
    {
      style: 'alert-danger',
      icon: 'fa-times'
    },
    {
      style: 'alert-warning',
      icon: 'fa-exclamation'
    },
    {
      style: 'alert-info',
      icon: 'fa-info'
    }
  ]

  constructor(
    public snackBar: MatSnackBar,
    public snackBarRef: MatSnackBarRef<NotificationsComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: INotification
  ) { }

  ngOnInit() { }

  public dismissSnackbar(): void {
    this.snackBar.dismiss();
  }

  findIconForStyle(style: string): string {
    return this.crossReference_StyleIcon.find(cr => cr.style == style).icon;
  }

}
