/**
 * @class Column
 * @classdesc datatable column object
 * represent the column object, at the very core of the data table system.
 * this object handles the behavior (filtering, sorting) as well as the values used and the style (width)
 */
export interface Column {

    /** @description name of the column displayed in the table header */
    displayName: string;

    /** @description name of the attribute in the JSON structure */
    contentName: string;

    /** @description keyword corresponding to that column that will be added in sColumns field */
    apiName: string;

    /** @description placeholder content of the input to filter on this column */
    placeholder?: string;

    /** @description is the column currently displayed in the table? */
    active: boolean;

    /** @description is the column displayed by default in the table? */
    defaultActive: boolean;

    /** @description type of the value of this column (used to have different layout) */
    type: COLUMN_TYPE;

    /** @description is filtering on this column is allowed? */
    filterable: boolean;

    /** @description type of filter for this column (dropdown choice, keyword filter)
     * must be specified if filterable = true
     */
    filterMode?: FILTER_MODE;

    /** @description is the filter for this column is currently displayed? */
    filterDisplayed?: boolean;

    /** @description is multiple items selection allowed for filtering on this column?
     * (only relevant if filter mode is  DROPDOWN) */
    multiple?: boolean;

    /** @description value(s) to filer with, can be a string or a string[] */
    sSearch?: any;

    /** @description is sorting on this column is allowed? */
    sortable?: boolean;

    /** @description width coefficient (style) */
    flexGrow?: number;

    /** @description custom function to display the content*/
    displayContentFunction?: (any) => string;
}

/**
 * @enum Column Type
 * @description used to display the column value differently
 */
export enum COLUMN_TYPE {
    BOOLEAN = 'boolean',
    LABEL = 'label',
    LONGTEXT = 'longtext',
    LIST = 'list',
    COUNTRIES = 'countries'
}

/**
 * @enum Filter Mode
 * @description used to set the correct input for filtering (select or text)
 */
export enum FILTER_MODE {
    DROPDOWN = 'DROPDOWN',
    SEARCH_FIELD = 'SEARCH_FIELD'
}
