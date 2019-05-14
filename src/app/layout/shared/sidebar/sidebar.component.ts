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
          link: '/design/testcaseslist'
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
      link: '/campaigns',
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
      link: '/run'
    },
    {
      name: 'Queue Management',
      link: '/queue',
      icon_class: 'si-list',
      expanded: false
    },
    {
      name: 'Robots',
      link: '/robots',
      icon_class: 'si-rocket',
      expanded: false
    }
  ];
  analyseMenu = [
    {
      name: 'Executions List',
      icon_class: 'si-control-forward',
      link: '/executions',
      expanded: false
    },
    {
      name: 'Report',
      link: '/report',
      icon_class: 'si-pie-chart',
      expanded: false
    }
  ];
  configureMenu = [
    {
      name: 'Applications',
      icon_class: 'si-screen-desktop',
      expanded: false,
      submenu: [{
        name: 'Application List',
        link: '/applications'
      },
      {
        name: 'Application Object',
        link: '/appobjects'
      },
      {
        name: 'Deployment Type',
        link: '/deployment'
      }]
    },
    {
      name: 'Integration',
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
