/**
 * @class MenuItem
 * @classdesc Menu item object used in the sidebar nav
 */
export class MenuItem {

    /** @description displayed name of the menu */
    name: string;

    /** @descriptionription line icons class (optional) */
    icon_class?: string;

    /** @description route to the ressource (optional) */
    link?: string;

    /** @description HTML attribute for automated testing */
    id: string;

    /** @description is the user authorized to access the ressource?  */
    authorized: boolean;

    /** @description child menu items of this node (optional)*/
    submenu?: Array<MenuItem>;

    /** @description are the submenu items displayed? */
    expanded: boolean;
}
