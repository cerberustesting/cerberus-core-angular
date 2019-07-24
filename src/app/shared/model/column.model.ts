export interface Column {
    displayName: string,
    contentName: string,
    active: boolean,
    databaseName?: string,
    width?: number, //default is 150
    type?: string, //for exemple 'label' or 'boolean'
    like?: boolean, //
    sortable?: boolean,
    searchable?: boolean,
    displayContentFunction?: (any) => string,
    dropActive?: boolean, //the dropdown is active 
    fieldActive?: boolean,
    booleanColumn?: boolean,
    param?: any,
    sSearch?: Array<any>
    
}