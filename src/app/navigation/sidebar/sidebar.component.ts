import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  testManagementMenu = [
    {
      name: 'Test',
      icon_class: 'si-grid',
      expanded: true,
      submenu: [
        {
          name: 'Testcase List',
          link: '/testcases'
        },
        {
          name: 'Testcase Edition',
          link: '/testcasescript'
        }
      ]
    },
    {
      name: 'Data',
      icon_class: 'si-layers',
      expanded: false,
      submenu: [{
        name: 'Data Library',
        link: '/datalibrary'
      },
      {
        name: 'Services',
        link: '/servicelibrary'
      }]
    },
    {
      name: 'Campaigns',
      link: '/dashboard',
      icon_class: 'si-paper-clip',
      expanded: false
    },
    {
      name: 'Labels',
      link: '/labels',
      icon_class: 'si-tag',
      expanded: false
    }
  ];
  runMenu = [
    {
      name: 'Run',
      icon_class: 'si-control-play',
      expanded: false,
      link: '/dashboard'
    },
    {
      name: 'Queue Management',
      link: '/dashboard',
      icon_class: 'si-list',
      expanded: false
    },
    {
      name: 'Robots',
      link: '/dashboard',
      icon_class: 'si-rocket',
      expanded: false
    }
  ];
  analyseMenu = [
    {
      name: 'Executions List',
      icon_class: 'si-control-forward',
      link: '/dashboard',
      expanded: false
    },
    {
      name: 'Report',
      link: '/dashboard',
      icon_class: 'si-pie-chart',
      expanded: false
    }
  ];
  configureMenu = [
    {
      name: 'Applications',
      icon_class: 'si-screen-desktop',
      link: '/dashboard',
      expanded: false,
      submenu: [{
        name: 'Application List',
        link: '/dashboard'
      },
      {
        name: 'Application Object',
        link: '/dashboard'
      },
      {
        name: 'Deployment Type',
        link: '/dashboard'
      }]
    },
    {
      name: 'Integration',
      link: '/dashboard',
      icon_class: 'si-equalizer',
      expanded: false,
      submenu: [{
        name: 'Environment',
        link: '/dashboard'
      },
      {
        name: 'Integration Status',
        link: '/dashboard'
      },
      {
        name: 'Build Revision',
        link: '/dashboard'
      },
      {
        name: 'Build Content',
        link: '/dashboard'
      },
      {
        name: 'Project',
        link: '/dashboard'
      },
      {
        name: 'Batch',
        link: '/dashboard'
      }]
    },
    {
      name: 'Administration',
      link: '/dashboard',
      icon_class: 'si-settings',
      expanded: false,
      submenu: [{
        name: 'User Management',
        link: '/dashboard'
      },
      {
        name: 'Logs',
        link: '/dashboard'
      },
      {
        name: 'Parameters',
        link: '/dashboard'
      },
      {
        name: 'Invariants',
        link: '/dashboard'
      },
      {
        name: 'DB Maintenance',
        link: '/dashboard'
      },
      {
        name: 'Monitoring',
        link: '/dashboard'
      }]
    }
  ];
  infoMenu = [
    {
      name: 'Info',
      icon_class: 'si-question',
      expanded: false,
      link: '/dashboard',
      submenu: [{
        name: 'Documentation',
        link: '/dashboard'
      },
      {
        name: 'Tutorials',
        link: '/dasboard'
      }]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
