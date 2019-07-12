export interface Column {
    displayName: string,
    contentName: string,
    active: boolean,
    databaseName: string,
    width?: number, //default is 150
    type?: string, //for exemple 'label'
    like?: boolean,
    sortable?: boolean,
    searchable?: boolean,
    displayContentFunction?: (any) => string
}