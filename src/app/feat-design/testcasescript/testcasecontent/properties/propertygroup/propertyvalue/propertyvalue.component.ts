import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyValue, PropertyGroup } from 'src/app/shared/model/back/testcase/property.model';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { Invariant } from 'src/app/shared/model/back/invariant/invariant.model';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import { CrossreferenceService } from 'src/app/core/services/utils/crossreference.service';
import crossReference_PropertyTypeValue from 'src/assets/data/cross_references/propertytype_value.json';

@Component({
  selector: 'app-propertyvalue',
  templateUrl: './propertyvalue.component.html',
  styleUrls: ['./propertyvalue.component.scss']
})
export class PropertyvalueComponent implements OnInit {

  // code editor options
  editorOptions: any;

  @Input('propertyvalue') propertyvalue: PropertyValue; // property value
  @Input('propertyvalueIndex') index: number; // index to build ids
  @Input('testcase') testcase: TestCase; // full testcase object
  @Input('propertygroup') propertygroup: PropertyGroup; // property group object will all values from others properties values
  @Input('inherited') inherited: boolean; // true if the property is in read-only mode

  // event to send to parent component with the name of the property to be duplicated
  @Output() propertyValueDuplication = new EventEmitter<PropertyValue>();

  // boolean to handle property value detail display
  public propertyValueDetailsDisplay: boolean;

  // boolean to handle the display of the actions (duplicate, delete)
  public showActions: boolean;

  // public invariants
  public propertyDatabases: Array<Invariant>;

  // private invariants
  private propertyTypesList: Array<Invariant>;
  private propertyNatures: Array<Invariant>;

  /** boolean to handle the display of advanced section */
  private showAdvancedSettings: boolean;

  constructor(
    private testService: TestcaseService,
    private notificationService: NotificationService,
    private invariantService: InvariantsService,
    private crossReferenceService: CrossreferenceService
  ) { }

  ngOnInit() {

    // hide details by default
    this.propertyValueDetailsDisplay = false;

    // hide by default the actions
    this.showActions = false;

    // subscribe to property type invariants
    this.invariantService.observablePropertyTypeList.subscribe(r => { if (r) { this.propertyTypesList = r; } });

    // subscribe to property nature invariants
    this.invariantService.observablePropertyNatureList.subscribe(r => { if (r) { this.propertyNatures = r; } });

    // subscribe to the database values
    this.invariantService.observablePropertyDatabaseList.subscribe(r => { if (r) { this.propertyDatabases = r; } });

    // configure the code editor
    this.editorOptions = { theme: 'vs', language: 'plaintext', readOnly: this.inherited };

    // by default, advanced settings aren't shown
    this.showAdvancedSettings = false;
  }

  /** return true if the country is selected in the property value
   * @param countryName value of the invariant (country) to check
  */
  isACountrySelected(countryName: string): boolean {
    if (this.propertyvalue.countries.find(invariant => invariant.value === countryName)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * return true if the country is selected in the property group
   * @param countryName value of the invariant (country) to check
   */
  isACountrySelectedInPropertyGroup(countryName: string): boolean {
    // create the condition
    const countryPresent = (propvalue: PropertyValue) => propvalue.countries.find(invariant => invariant.value === countryName);
    // apply to all the elements of the property groups
    return this.propertygroup.values.some(countryPresent);
  }

  /**
   * push a new country  to the property value
   * @param country country invariant to add
   */
  addCountryToSelection(country: Invariant): void {
    this.propertyvalue.countries.push(country);
  }

  /**
   * remove an existing country in the property value
   * @param country country invariant to remove
  */
  removeCountryFromSelection(country: Invariant): void {
    const index = this.propertyvalue.countries.findIndex(invariant => invariant.value === country.value);
    console.log(index);
    this.propertyvalue.countries.splice(index, 1);
  }

  // fired when a country badge is clicked
  // add the country, removes it or do nothing accordingly
  toggleCountry(country: Invariant): void {
    if (this.inherited === false) {
      if (this.isACountrySelectedInPropertyGroup(country.value)) {
        // if the country is already selected for another property value
        // if we are trying to select it, we do nothing
        if (!this.isACountrySelected(country.value)) {
          this.notificationService.createANotification('This country is already in use in another property. You must unselect it first for that property.', NotificationStyle.Info);
        } else {
          // if we are trying to unselect it, we removes it
          this.removeCountryFromSelection(country);
        }
      } else {
        // if the country is not selected anywhere, add it to the selection
        this.addCountryToSelection(country);
      }
    }
  }

  // send the property value to the parent component to be added to the list
  duplicateAPropertyValue() {
    this.propertyValueDuplication.emit(this.propertyvalue);
  }

  // send the property value to the parent component to be removed from the list
  deleteAPropertyValue() {
    this.propertyvalue.toDelete = !this.propertyvalue.toDelete;
  }

  // return the text to display according to the property value deletion status
  getDeletionPopoverText(): string {
    if (this.propertyvalue.toDelete === true) {
      return 'This property will be deleted after saving';
    } else {
      return 'Delete value';
    }
  }

  // return true if the delete button should be displayed
  // in the situation the propery value is flagged for deletion
  isDeleteButtonDisplayed(): boolean {
    if (this.showActions === true || this.propertyvalue.toDelete === true) {
      return true;
    } else {
      return false;
    }
  }

  // update the language type for the editor
  onTypeChange(event: any) {
    const newType = event.target.value;
    if (this.crossReferenceService.hasCrossReference(newType, this.crossReferenceService.crossReference_PropertyTypeLanguage) === false) {
      this.editorOptions.language = 'plaintext';
    } else {
      // @ts-ignore
      this.editorOptions = this.crossReferenceService.findCrossReference(newType, this.crossReferenceService.crossReference_PropertyTypeLanguage);
    }
  }

  // return a boolean to handle the "disable" attribute for fields
  // if the property is displayed as inherited
  areFieldsEnabled(): boolean {
    return this.inherited;
  }

  hasCrossReference(reference: string) {
    return this.crossReferenceService.hasCrossReference(reference, crossReference_PropertyTypeValue);
  }

  findCrossReference(reference: string) {
    return this.crossReferenceService.findCrossReference(reference, crossReference_PropertyTypeValue);
  }

  /**
   * return true if the advanced settings item (nature, retry...) should be displayed with the property type
   * @param type type of the property value
   * @param setting field name
   */
  settingFieldReferenced(type: string, setting: string): boolean {
    if (this.hasCrossReference(type)) {
      return this.findCrossReference(type).fields.includes(setting);
    } else {
      console.error('advanced setting field display error, please open an issue on github, type=' + type + ' setting=' + setting);
      return false;
    }
  }

}
