import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from 'src/app/core/services/utils/header-title.service';
declare function initChartJS();
declare function ElementFadeIn(elementId, delay);

export class HomepageTab {

  name: string;
  icon: string;
  id: string;
  link?: string;

  constructor(name: string, icon: string, id: string, link?: string) {
    this.name = name;
    this.icon = icon;
    this.id = id;
    this.link = link;
  }
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public tabs: HomepageTab[];

  public currentTab: HomepageTab;

  constructor(private headerTitleService: HeaderTitleService) {
  }

  ngOnInit() {

    this.tabs = [
      new HomepageTab('Documentation', 'fa fa-book', 'docs'),
      new HomepageTab('What\'s new?', 'fa fa-lightbulb', 'changelog'),
      new HomepageTab('Github', 'fab fa-github', 'github', 'https://github.com/cerberustesting/cerberus-source'),
      new HomepageTab('Community Slack', 'fab fa-slack', 'slack', 'https://cerberustesting.slack.com')
    ];

    this.currentTab = null;

    initChartJS();

    this.headerTitleService.setTitle('Home', 'Home');

    ElementFadeIn('docs', 500);
    ElementFadeIn('changelog', 1000);
    ElementFadeIn('github', 1500);
    ElementFadeIn('slack', 2000);
  }

  toggleTab(tab: HomepageTab) {
    if (tab.link) {
      // open the link in a new tab
      window.open(tab.link, '_blank');
    } else {
      if (tab === this.currentTab) {
        this.currentTab = null;
      } else {
        this.currentTab = tab;
      }
    }
  }

}
