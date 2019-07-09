export interface Column {
    displayName: string,
    contentName: string,
    active: boolean,
    width?: number,
    displayContentFunction?: (any) => string,

}