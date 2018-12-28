import { Injectable } from '@angular/core';
import { CrossReference } from 'src/app/model/crossreference.model';

@Injectable({
  providedIn: 'root'
})
export class CrossreferenceService {

  public crossReference_ConditionValue: Array<CrossReference> = [
    { reference: "always", value1: null, value2: null },
    { reference: "ifPropertyExist", value1: "Property Name", value2: null },
    { reference: "ifElementPresent", value1: "Element", value2: null },
    { reference: "ifElementNotPresent", value1: "Element", value2: null },
    { reference: "ifTextInElement", value1: "Element", value2: "Text" },
    { reference: "ifTextNotInElement", value1: "Element", value2: "Text" },
    { reference: "ifNumericEqual", value1: "Number 1", value2: "Number 2" },
    { reference: "ifNumericDifferent", value1: "Number 1", value2: "Number 2" },
    { reference: "ifNumericGreater", value1: "Number 1", value2: "Number 2" },
    { reference: "ifNumericGreaterOrEqual", value1: "Number 1", value2: "Number 2" },
    { reference: "ifNumericMinor", value1: "Number 1", value2: "Number 2" },
    { reference: "ifNumericMinorOrEqual", value1: "Number 1", value2: "Number 2" },
    { reference: "ifStringEqual", value1: "String 1", value2: "String 2" },
    { reference: "ifStringDifferent", value1: "String 1", value2: "String 2" },
    { reference: "ifStringGreater", value1: "String 1", value2: "String 2" },
    { reference: "ifStringMinor", value1: "String 1", value2: "String 2" },
    { reference: "ifStringContains", value1: "String", value2: "Contains" },
    { reference: "never", value1: null, value2: null }
  ];
  public crossReference_ActionValue: Array<CrossReference> = [
    { reference: "Unknown", value1: null, value2: null },
    { reference: "click", value1: "Element path", value2: null },
    { reference: "mouseLeftButtonPress", value1: "Element path", value2: null },
    { reference: "mouseLeftButtonRelease", value1: "Element path", value2: null },
    { reference: "doubleClick", value1: "Element path", value2: null },
    { reference: "rightClick", value1: "Element path", value2: null },
    { reference: "mouseOver", value1: "Element path", value2: null },
    { reference: "focusToIframe", value1: "Iframe path", value2: null },
    { reference: "focusDefaultIframe", value1: null, value2: null },
    { reference: "switchToWindow", value1: "Window title or URL", value2: null },
    { reference: "manageDialog", value1: "Ok or Cancel", value2: null },
    { reference: "openUrlWithBase", value1: "URI", value2: null },
    { reference: "openUrlLogin", value1: null, value2: null },
    { reference: "openUrl", value1: "URL", value2: null },
    { reference: "executeJS", value1: "Script", value2: null },
    { reference: "executeCommand", value1: "Command", value2: "Arguments" },
    { reference: "openApp", value1: "Path", value2: "Activity" },
    { reference: "closeApp", value1: "Path", value2: null },
    { reference: "dragAndDrop", value1: "Element Path", value2: "Destination Path" },
    { reference: "select", value1: "Element", value2: "option" },
    { reference: "keypress", value1: "Element", value2: "Key" },
    { reference: "type", value1: "Element", value2: "Text" },
    { reference: "hideKeyboard", value1: null, value2: null },
    { reference: "swipe", value1: "Action", value2: "Direction" },
    { reference: "scrollTo", value1: "Element", value2: "Text" },
    { reference: "installApp", value1: "Path", value2: null },
    { reference: "removeApp", value1: "Package", value2: null },
    { reference: "wait", value1: "Duration", value2: null },
    { reference: "waitVanish", value1: "Element", value2: null },
    { reference: "callService", value1: "Service", value2: null },
    { reference: "executeSqlUpdate", value1: "DB", value2: "Script" },
    { reference: "executeSqlStoredProcedure", value1: "DB", value2: "Procedure" },
    { reference: "calculateProperty", value1: "Property", value2: "Override with" },
    { reference: "doNothing", value1: null, value2: null },
    { reference: "mouseOverAndWait", value1: null, value2: null },
    { reference: "removeDifference", value1: null, value2: null }
  ];

  constructor() { }

  hasConditionCrossReference(condition: string): boolean {
    return this.crossReference_ConditionValue.filter(cr => cr.reference === condition).length > 0;
  }

  findConditionCrossReference(condition: string): CrossReference {
    return this.crossReference_ConditionValue.find(cr => cr.reference === condition);
  }

  hasActionCrossReference(action: string): boolean {
    return this.crossReference_ActionValue.filter(cr => cr.reference === action).length > 0;
  }
  findActionCrossReference(action: string): CrossReference {
    return this.crossReference_ActionValue.find(cr => cr.reference === action);
  }
}
