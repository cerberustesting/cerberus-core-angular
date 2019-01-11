import { Injectable } from '@angular/core';

export class CrossReference {
  reference: string;
  value1: string;
  value2: string;
  description1?: string;
  description2?: string;
  info_title1?: string;
  info_title2?: string;
  icon?: string;
}

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
    {
      reference: "click",
      value1: "Element",
      value2: null,
      info_title1: "Element Path",
      description1: "Path to the element that you want to click in. You can use xPath or predefined selector such as id or data-cerberus.",
      icon: "fa fa-mouse-pointer"
    },
    {
      reference: "mouseLeftButtonPress",
      value1: "Element",
      value2: null,
      info_title1: "Element Path",
      description1: "Path to the element that you want to interact with. You can use xPath or predefined selector such as id or data-cerberus.",
      icon: "fa fa-mouse-pointer"
    },
    {
      reference: "mouseLeftButtonRelease",
      value1: "Element",
      value2: null,
      info_title1: "Element Path",
      description1: "Path to the element that you want to interact with. You can use xPath or predefined selector such as id or data-cerberus.",
      icon: "fa fa-mouse-pointer"
    },
    {
      reference: "doubleClick",
      value1: "Element",
      value2: null,
      info_title1: "Element Path",
      description1: "Path to the element that you want to double click in. You can use xPath or predefined selector such as id or data-cerberus.",
      icon: "fa fa-mouse-pointer"
    },
    {
      reference: "rightClick",
      value1: "Element",
      value2: null,
      info_title1: "Element Path",
      description1: "Path to the element that you want to interact with. You can use xPath or predefined selector such as id or data-cerberus.",
      icon: "fa fa-mouse-pointer"
    },
    {
      reference: "mouseOver",
      value1: "Element",
      value2: null,
      info_title1: "Element Path",
      description1: "Path to the element that you want to interact with. You can use xPath or predefined selector such as id or data-cerberus.",
      icon: "fa fa-mouse-pointer"
    },
    {
      reference: "focusToIframe",
      value1: "Iframe",
      value2: null,
      info_title1: "Iframe Path",
      description1: "Path to the iframe that you want to focus. You can use xPath or predefined selector such as id or data-cerberus.",
      icon: "fa fa-object-ungroup"
    },
    { reference: "focusDefaultIframe", value1: null, value2: null, icon: "fa fa-object-ungroup" },
    {
      reference: "switchToWindow",
      value1: "Window",
      value2: null,
      info_title1: "Window title or URL",
      description1: "Title of the window / tab that you want to select as it is displayed in the browser.",
      icon: "fa fa-object-ungroup"
    },
    {
      reference: "manageDialog",
      value1: "Choice",
      value2: null,
      info_title1: "Dialog Choice",
      description1: "Choice taht you want to select on the expected dialog. Can be Ok or Cancel",
      icon: "fa fa-comment"
    },
    { reference: "openUrlWithBase", value1: "URI", value2: null, icon: "fa fa-external-link-alt" },
    { reference: "openUrlLogin", value1: null, value2: null, icon: "fa fa-external-link-alt" },
    { reference: "openUrl", value1: "URL", value2: null, icon: "fa fa-external-link-alt" },
    { reference: "executeJS", value1: "Script", value2: null, icon: "fa fa-code" },
    { reference: "executeCommand", value1: "Command", value2: "Arguments", icon: "fa fa-code" },
    { reference: "openApp", value1: "Path", value2: "Activity", icon: "fa fa-file" },
    { reference: "closeApp", value1: "Path", value2: null, icon: "fa fa-file" },
    { reference: "dragAndDrop", value1: "Element Path", value2: "Destination Path", icon:"fa fa-arrows-alt" },
    { reference: "select", value1: "Element", value2: "option", icon: "fa fa-list-ul" },
    { reference: "keypress", value1: "Element", value2: "Key", icon: "fa fa-keyboard" },
    { reference: "type", value1: "Element", value2: "Text", icon: "fa fa-i-cursor" },
    { reference: "hideKeyboard", value1: null, value2: null, icon: "fa fa-keyboard" },
    { reference: "swipe", value1: "Action", value2: "Direction", icon: "fa fa-hand-point-up" },
    { reference: "scrollTo", value1: "Element", value2: "Text", icon: "fa fa-scroll" },
    { reference: "installApp", value1: "Path", value2: null, icon: "fa fa-file" },
    { reference: "removeApp", value1: "Package", value2: null, icon: "fa fa-file" },
    { reference: "wait", value1: "Duration", value2: null, icon:"fa fa-clock" },
    { reference: "waitVanish", value1: "Element", value2: null, icon:"fa fa-clock" },
    { reference: "callService", value1: "Service", value2: null, icon:"fa fa-exchange-alt"},
    { reference: "executeSqlUpdate", value1: "DB", value2: "Script", icon: "fa fa-code" },
    { reference: "executeSqlStoredProcedure", value1: "DB", value2: "Procedure", icon: "fa fa-code" },
    { reference: "calculateProperty", value1: "Property", value2: "Override with", icon:"fa fa-cog" },
    { reference: "doNothing", value1: null, value2: null },
    { reference: "mouseOverAndWait", value1: null, value2: null },
    { reference: "removeDifference", value1: null, value2: null }
  ];
  public crossReference_ControlValue: Array<CrossReference> = [
    { reference: "Unknown", value1: null, value2: null },
    { reference: "verifyStringEqual", value1: "String 1", value2: "String 2", icon: "fa fa-highlighter" },
    { reference: "verifyStringDifferent", value1: "String 1", value2: "String 2" },
    { reference: "verifyStringGreater", value1: "String 1", value2: "String 2" },
    { reference: "verifyStringMinor", value1: "String 1", value2: "String 2" },
    { reference: "verifyStringContains", value1: "String 1", value2: "String 2" },
    { reference: "verifyNumericEquals", value1: "Number 1", value2: "Number 2" },
    { reference: "verifyNumericDifferent", value1: "Number 1", value2: "Number 2" },
    { reference: "verifyNumericGreater", value1: "Number 1", value2: "Number 2" },
    { reference: "verifyNumericGreaterOrEqual", value1: "Number 1", value2: "Number 2" },
    { reference: "verifyNumericMinor", value1: "Number 1", value2: "Number 2" },
    { reference: "verifyNumericMinorOrEqual", value1: "Number 1", value2: "Number 2" },
    { reference: "verifyElementPresent", value1: "Element path", value2: null },
    { reference: "verifyElementNotPresent", value1: "Element path", value2: null },
    { reference: "verifyElementVisible", value1: "Element path", value2: null },
    { reference: "verifyElementNotVisible", value1: "Element path", value2: null },
    { reference: "verifyElementEquals", value1: "Path", value2: "Expected Element" },
    { reference: "verifyElementDifferent", value1: "Path", value2: "Expected Element" },
    { reference: "verifyElementInElement", value1: "Master", value2: "Sub" },
    { reference: "verifyElementClickable", value1: "Element", value2: null },
    { reference: "verifyElementNotClickable", value1: "Element", value2: null },
    { reference: "verifyTextInElement", value1: "Element", value2: "Text" },
    { reference: "verifyTextNotInElement", value1: "Element", value2: "Text" },
    { reference: "verifyRegexInElement", value1: "Element", value2: "Regex" },
    { reference: "verifyTextInPage", value1: "Regex", value2: null },
    { reference: "verifyTextNotInPage", value1: "Regex", value2: null },
    { reference: "verifyTitle", value1: "Title", value2: null },
    { reference: "verifyUrl", value1: "URL", value2: null },
    { reference: "verifyTextInDialog", value1: "Text", value2: null },
    { reference: "verifyXmlTreeStructure", value1: "xPath", value2: "Tree" },
    { reference: "takeScreenshot", value1: null, value2: null },
    { reference: "getPageSource", value1: null, value2: null }
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

  hasControlCrossReference(control: string): boolean {
    return this.crossReference_ControlValue.filter(cr => cr.reference === control).length > 0;
  }

  findControlCrossReference(control: string): CrossReference {
    return this.crossReference_ControlValue.find(cr => cr.reference === control);
  }
}