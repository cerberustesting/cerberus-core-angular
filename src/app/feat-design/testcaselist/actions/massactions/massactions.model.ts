/**
 * list of field types for mass actions.
 */
export enum MassActionType {
    Text = 'text',
    Invariants = 'invariants',
    Applications = 'applications'
}

/**
 * List of available fields to perform mass actions
 */
export enum MassActionField {
    Status = 'status',
    Application = 'applications',
    Executor = 'executor',
    Priority = 'priority',
    Labels = 'labels'
}
