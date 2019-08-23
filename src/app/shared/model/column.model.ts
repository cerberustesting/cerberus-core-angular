export interface Column {
    displayName: string, // Display name in column header
    contentName: string, // name of the property in this column
    active: boolean, // display in table ?
    defaultActive?: boolean, // active by default and after reset
    apiName: string, // name of the column in the api TODO
    type?: COLUMN_TYPE, // type of content
    like?: boolean, // the column can be filter with a search field
    sortable?: boolean, // the column can be sortable
    searchable?: boolean, // the column can be filter with a dropdown
    displayContentFunction?: (any) => string, // if some value need a function to be display
    filterDisplayed?: boolean, //the dropdown filter is active 
    filterMode?: FILTER_MODE,
    fieldActive?: boolean, // the text field filter is active
    placeholder?: string, // Placeholder of the corresponding filter
    multiple?: boolean, // can select multiple item at time
    sSearch?: Array<any>, // values to filters
    flexGrow?: number //width coefficient    
}

export enum COLUMN_TYPE {
    BOOLEAN = 'boolean',
    LABEL = 'label',
    LONGTEXT = 'longtext',
    LIST = 'list'
}

export enum FILTER_MODE {
    DROPDOWN = 'DROPDOWN',
    SEARCH_FIELD = 'SEARCH_FIELD'
}