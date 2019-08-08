import { Column } from 'src/app/shared/model/column.model';

export var CampainsColumnsData: Column[] = [
    {
        displayName: 'Test Campaign',
        databaseName: 'campaign',
        contentName: 'campaign',
        active: true,
        flexGrow: 100,
        defaultActive: true,
        searchable: true,
        dropActive: false,
        param: {
            multiple: true,
            field: 'application',
            placeholder: 'Select applications',
        },
        sSearch: []
    },
    {
        displayName: 'Email Notify Start',
        databaseName: 'notifyStartTagExecution',
        contentName: 'notifyStartTagExecution',
        active: true,
        flexGrow: 100,
        defaultActive: true,
        searchable: true,
        type: 'boolean',
        dropActive: false,
        param: {
            multiple: true,
            field: 'application',
            placeholder: 'Select applications',
        },
        sSearch: []
    },
    {
        displayName: 'Email Notify End',
        databaseName: 'notifyEndTagExecution',
        contentName: 'notifyEndTagExecution',
        active: true,
        flexGrow: 100,
        defaultActive: true,
        searchable: true,
        type: 'boolean',
        dropActive: false,
        param: {
            multiple: true,
            field: 'application',
            placeholder: 'Select applications',
        },
        sSearch: []
    },
    {
        displayName: 'Distribution List',
        databaseName: 'distribList',
        contentName: 'distribList',
        active: true,
        flexGrow: 100,
        defaultActive: true,
        searchable: true,
        type: 'longtext',
        dropActive: false,
        param: {
            multiple: true,
            field: 'application',
            placeholder: 'Select applications',
        },
        sSearch: []
    },
    {
        displayName: 'Slack Notify Start',
        databaseName: 'SlackNotifyStartTagExecution',
        contentName: 'SlackNotifyStartTagExecution',
        active: true,
        flexGrow: 100,
        defaultActive: true,
        searchable: true,
        type: 'boolean',
        dropActive: false,
        param: {
            multiple: true,
            field: 'application',
            placeholder: 'Select applications',
        },
        sSearch: []
    },
    {
        displayName: 'Slack Notify End',
        databaseName: 'SlackNotifyEndTagExecution',
        contentName: 'SlackNotifyEndTagExecution',
        active: true,
        flexGrow: 100,
        defaultActive: true,
        searchable: true,
        type: 'boolean',
        dropActive: false,
        param: {
            multiple: true,
            field: 'application',
            placeholder: 'Select applications',
        },
        sSearch: []
    },
    {
        displayName: 'Slack Webhook URL',
        databaseName: 'SlackWebhook',
        contentName: 'SlackWebhook',
        active: true,
        flexGrow: 100,
        defaultActive: true,
        searchable: true,
        dropActive: false,
        param: {
            multiple: true,
            field: 'application',
            placeholder: 'Select applications',
        },
        sSearch: []
    },
    {
        displayName: 'Slack Channel',
        databaseName: 'SlackChannel',
        contentName: 'SlackChannel',
        active: true,
        flexGrow: 100,
        defaultActive: true,
        searchable: true,
        dropActive: false,
        param: {
            multiple: true,
            field: 'application',
            placeholder: 'Select applications',
        },
        sSearch: []
    },
    {
        displayName: 'Description',
        databaseName: 'description',
        contentName: 'description',
        active: true,
        flexGrow: 100,
        defaultActive: true,
        dropActive: false,
        type: 'longtext',
        like: true,
        param: {
            multiple: true,
            field: 'application',
            placeholder: 'Select applications',
        },
        sSearch: []
    },
];