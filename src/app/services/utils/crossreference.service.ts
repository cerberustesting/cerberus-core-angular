import { Injectable } from '@angular/core';
import propertytype_value from 'src/assets/data/cross_references/propertytype_value.json';
import condition_value from 'src/assets/data/cross_references/condition_value.json';
import action_value from 'src/assets/data/cross_references/action_value.json';
import control_value from 'src/assets/data/cross_references/control_value.json';
import propertyadvancedfields_value from 'src/assets/data/cross_references/propertyadvancedfields_value.json';

export class CrossReference {
  reference: string;
  value1?: string;
  value2?: string;
  description1?: string;
  description2?: string;
  info_title1?: string;
  info_title2?: string;
  db?: string;
  db_description?: string;
  icon?: string;
  icon_value1?: string;
  icon_value2?: string;
  fields?: Array<string>;
}

export interface ICrossReference extends CrossReference { }

@Injectable({
  providedIn: 'root'
})
export class CrossreferenceService {

  // populate service variable with JSON plain files
  public crossReference_ConditionValue: Array<ICrossReference> = condition_value;
  public crossReference_ActionValue: Array<ICrossReference> = action_value;
  public crossReference_ControlValue: Array<ICrossReference> = control_value;
  public crossReference_PropertyTypeValue: Array<ICrossReference> = propertytype_value;
  public crossReference_PropertyAdvancedFields: Array<ICrossReference> = propertyadvancedfields_value;

  constructor() { }

  // return true if the reference has a crossReference in the inputted crossReference array
  hasCrossReference(reference: string, array: Array<ICrossReference>): boolean {
    return array.filter(cr => cr.reference === reference).length > 0;
  }

  // return the cross reference object
  findCrossReference(reference: string, array: Array<ICrossReference>) {
    return array.find(cr => cr.reference === reference);
  }

}