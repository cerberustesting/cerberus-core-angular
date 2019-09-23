import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input('nightMode') _nightMode: boolean;
  @Output() nightModeOutput = new EventEmitter<void>();

  testManagementMenu = [
    {
      name: 'Test',
      icon_class: 'si-grid',
      expanded: false,
      submenu: [
        {
          name: 'Testcase List',
          link: '/design/testcaseslist'
        },
        {
          name: 'Testcase Edition',
          link: '/design/testcasescript'
        }
      ]
    },
    {
      name: 'Data',
      icon_class: 'si-layers',
      expanded: false,
      submenu: [{
        name: 'Data Library',
        link: '/design/datalibrary'
      },
      {
        name: 'Services',
        link: '/servicelibrary'
      }]
    },
    {
      name: 'Campaigns',
      link: '/design/campaigns',
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
      link: '/analyse/report',
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

  menus = [
    { name: 'Design', data: this.testManagementMenu, expanded: false },
    { name: 'Run', data: this.runMenu, expanded: false },
    { name: 'Analyse', data: this.analyseMenu, expanded: false },
    { name: 'Configure', data: this.configureMenu, expanded: false }
  ];
  write = console.log;
  toggleNightMode() {
    this.nightModeOutput.emit();
  }

  toggleMenu(menu) {
    for (const section of this.menus) {
      for (const li of section.data) {
        if (li !== menu) { li.expanded = false; }
      }
    }
    menu.expanded = !menu.expanded;
  }

  constructor() { }

  ngOnInit() { }

}
