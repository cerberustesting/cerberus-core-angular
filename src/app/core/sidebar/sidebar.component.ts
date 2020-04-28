import { Component, OnInit } from '@angular/core';
import { UserPreferencesService } from '../services/utils/userpreferences.service';
import { User } from 'src/app/shared/model/back/user/user.model';
import { UserService } from '../services/api/user.service';
import { MenuItem } from 'src/app/shared/model/front/menu.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  // user information
  private user: User;

  public nightMode: boolean;

  /** menu item currently expanded */
  private currentActiveMenu: MenuItem;

  constructor(
    private userPreferencesService: UserPreferencesService,
    private userService: UserService,
    private router: Router
  ) { this.currentActiveMenu = null; }

  // menu content
  public menu: Array<MenuItem>;

  toggleNightMode() {
    this.userPreferencesService.toggleNightMode();
  }

  toggleMenu(menu) {
    // browse through every first level of menu
    for (const submenu1 of this.menu) {
      // browse through every seconde level of menu
      for (const li of submenu1.submenu) {
        // if the menuitem corresponds to the one passed in parameters
        if (li !== menu) {
          // collapse every menu item
          li.expanded = false;
        }
      }
    }

    // then toggles back to true
    menu.expanded = !menu.expanded;

    // if the current active menu is being toggled
    if (this.currentActiveMenu === menu) {
      // empty the active menu variable
      this.currentActiveMenu = null;
    } else {
      // save the menu item
      this.currentActiveMenu = menu;
    }
  }

  ngOnInit() {
    // subscribe to nightMode changes
    this.userPreferencesService.observableNightMode.subscribe(r => { this.nightMode = r; });
    // subscribe to user changes
    this.userService.observableUser.subscribe(r => {
      this.user = r;
      if (this.user) {
        this.buildMenu();
      }
    });
  }

  /** expande the active menu item */
  mouseEnterInSidebar() {
    const menuItem = this.findASecondLevelMenuItem(this.currentActiveMenu);
    if (menuItem) {
      menuItem.expanded = true;
    }
  }

  /** collapse the active menu item */
  mouseLeaveFromSidebar() {
    const menuItem = this.findASecondLevelMenuItem(this.currentActiveMenu);
    if (menuItem) {
      menuItem.expanded = false;
    }
  }

  /** return the MenuItem object corresponding to the one passed in parameters in the global menu variable
   * return null if there is no expanded menu
   * @param menuItem object to search
   */
  findASecondLevelMenuItem(menuItem: MenuItem): MenuItem {
    if (this.currentActiveMenu) {
      // instantiate the menu item object to be found
      let res = null;
      // for each submenus (first level)
      this.menu.forEach(firstLevelMenu => {
        // if the menu item is found
        const found = firstLevelMenu.submenu.find(menuitem => menuitem === menuItem);
        if (found) { res = found; }
      });
      return res;
    } else {
      return null;
    }
  }

  /** build the menu tree structure */
  buildMenu() {
    this.menu = [
      {
        name: 'Design',
        expanded: false,
        authorized: true,
        id: 'designSection',
        submenu: [
          {
            name: 'Test',
            icon_class: 'si-chemistry',
            expanded: false,
            authorized: true,
            id: 'testMenu',
            submenu: [
              {
                name: 'Test Case List',
                expanded: false,
                id: 'tcListMenu',
                link: '/design/testcaseslist',
                authorized: this.user.group.includes('TestRO')
              },
              {
                name: 'Test Case Edition',
                expanded: false,
                id: 'tcEditionMenu',
                link: '/design/testcasescript',
                authorized: this.user.group.includes('Test')
              }
            ]
          },
          {
            name: 'Data',
            icon_class: 'si-layers',
            expanded: false,
            authorized: true,
            id: 'dataMenu',
            submenu: [
              {
                name: 'Data Library',
                link: '/datalibs',
                authorized: true,
                id: '/design/dataLibMenu',
                expanded: false
              },
              {
                name: 'Services',
                link: '/design/services',
                authorized: true,
                id: 'servicesMenu',
                expanded: false
              }
            ]
          },
          {
            name: 'Campaigns',
            link: '/design/campaigns',
            icon_class: 'si-folderc',
            id: 'campaignsMenu',
            expanded: false,
            authorized: true
          },
          {
            name: 'Labels',
            link: '/design/labels',
            icon_class: 'si-tag',
            authorized: true,
            expanded: false,
            id: 'labelsMenu'
          }
        ]
      },
      {
        name: 'Run',
        expanded: false,
        authorized: true,
        id: 'runSection',
        submenu: [
          {
            name: 'Run Tests',
            id: 'runTestsMenu',
            authorized: true,
            icon_class: 'si-control-play',
            expanded: false,
            link: '/run/runtests'
          },
          {
            name: 'Queue Management',
            id: 'queueManagementMenu',
            authorized: true,
            link: '/run/queue',
            icon_class: 'si-list',
            expanded: false
          },
          {
            name: 'Robots',
            id: 'robotsMenu',
            authorized: true,
            link: '/run/robots',
            icon_class: 'si-rocket',
            expanded: false
          }
        ]
      },
      {
        name: 'Analyse',
        expanded: false,
        authorized: true,
        id: 'analyseSection',
        submenu: [
          {
            name: 'Reports',
            id: 'reportMenu',
            authorized: true,
            link: '/analyse/report',
            icon_class: 'si-pie-chart',
            expanded: false
          }
        ]
      },
      {
        name: 'Configure',
        expanded: false,
        authorized: true,
        id: 'configure',
        submenu: [
          {
            name: 'Applications',
            icon_class: 'si-screen-desktop',
            expanded: false,
            id: 'applications',
            authorized: true,
            submenu: [
              {
                name: 'Application List',
                link: '/applications',
                expanded: false,
                authorized: true,
                id: 'applicationsMenu'
              },
              {
                name: 'Application Object',
                link: '/appobjects',
                expanded: false,
                authorized: true,
                id: 'applicationObjectsMenu'
              },
              {
                name: 'Deployment Type',
                link: '/deployment',
                expanded: false,
                authorized: true,
                id: 'deploymentMenu'
              }
            ]
          },
          {
            name: 'Integration',
            icon_class: 'si-equalizer',
            expanded: false,
            id: 'integration',
            authorized: true,
            submenu: [
              {
                name: 'Environment',
                link: '/home',
                expanded: false,
                authorized: true,
                id: 'applicationObjectsMenu'
              },
              {
                name: 'Integration Status',
                link: '/home',
                expanded: false,
                authorized: true,
                id: 'applicationObjectsMenu'
              },
              {
                name: 'Build Revision',
                link: '/home',
                expanded: false,
                authorized: true,
                id: 'applicationObjectsMenu'
              },
              {
                name: 'Build Content',
                link: '/home',
                expanded: false,
                authorized: true,
                id: 'applicationObjectsMenu'
              },
              {
                name: 'Project',
                link: '/home',
                expanded: false,
                authorized: true,
                id: 'applicationObjectsMenu'
              },
              {
                name: 'Batch',
                link: '/home',
                expanded: false,
                authorized: true,
                id: 'applicationObjectsMenu'
              }
            ]
          },
          {
            name: 'Administration',
            link: '/home',
            icon_class: 'si-settings',
            expanded: false,
            authorized: true,
            id: 'administration',
            submenu: [
              {
                name: 'User Management',
                link: '/home',
                expanded: false,
                authorized: true,
                id: 'applicationObjectsMenu'
              },
              {
                name: 'Logs',
                link: '/home',
                expanded: false,
                authorized: true,
                id: 'applicationObjectsMenu'
              },
              {
                name: 'Parameters',
                link: '/home',
                expanded: false,
                authorized: true,
                id: 'applicationObjectsMenu'
              },
              {
                name: 'Invariants',
                link: '/home',
                expanded: false,
                authorized: true,
                id: 'applicationObjectsMenu'
              },
              {
                name: 'DB Maintenance',
                link: '/home',
                expanded: false,
                authorized: true,
                id: 'applicationObjectsMenu'
              },
              {
                name: 'Monitoring',
                link: '/home',
                expanded: false,
                authorized: true,
                id: 'applicationObjectsMenu'
              }
            ]
          }
        ]
      },
      {
        name: 'Help',
        expanded: false,
        authorized: true,
        id: 'helpSection',
        submenu: [
          {
            name: 'Documentation',
            id: 'tcListMenu',
            icon_class: 'si-question',
            link: '/pagenotfound',
            authorized: true,
            expanded: false
          }
        ]
      }
    ];
  }

}
