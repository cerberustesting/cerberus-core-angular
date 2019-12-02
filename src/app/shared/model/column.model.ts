// represent the column object,
// at the very core of the data table system.
// this object handles the behavior (filtering, sorting)
// as well as the values used
// and the style (width)
export interface Column {
    displayName: string; // display name in column header
    contentName: string; // name of the property in this column
    placeholder?: string; // placeholder of the corresponding filter
    apiName: string; // name of the column in the api
    active: boolean; // displayed in table
    defaultActive?: boolean; // displayed by default in table
    type?: COLUMN_TYPE; // column's values type of content
    filterable?: boolean; // enable the column for filtering
    filterMode?: FILTER_MODE; // filter type : dropdown or text search
    filterDisplayed?: boolean; // the dropdown filter is active
    multiple?: boolean; // can select multiple items when filtering with dropdown only
    sSearch?: any; // values to filters with (could be a string, or an array of string)
    sortable?: boolean; // enable the column for sorting
    flexGrow?: number; // width coefficient (style)
    displayContentFunction?: (any) => string; // if some value need a function to be displayed
}

// column's value type of content
export enum COLUMN_TYPE {
    BOOLEAN = 'boolean',
    LABEL = 'label',
    LONGTEXT = 'longtext',
    LIST = 'list'
}

// filter type
export enum FILTER_MODE {
    DROPDOWN = 'DROPDOWN',
    SEARCH_FIELD = 'SEARCH_FIELD'
}
