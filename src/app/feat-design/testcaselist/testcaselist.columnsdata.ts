import { Column, COLUMN_TYPE, FILTER_MODE } from 'src/app/shared/model/column.model';

export const TestCasesColumnsData: Column[] = [
    {
        displayName: 'Application',
        apiName: 'tec.application',
        contentName: 'application',
        active: true,
        flexGrow: 100,
        defaultActive: true,
        searchable: true,
        filterDisplayed: false,
        multiple: true,
        placeholder: 'Select applications',
        sSearch: [],
        filterMode: FILTER_MODE.DROPDOWN,
    },
    {
        displayName: 'Test Folder',
        apiName: 'tec.test',
        contentName: 'test',
        active: true,
        flexGrow: 100,
        defaultActive: true,
        searchable: true,
        filterDisplayed: false,
        multiple: true,
        placeholder: 'Select test',
        sSearch: []

    },
    {
        displayName: 'TestCase ID',
        apiName: 'tec.testCase',
        contentName: 'testCase',
        flexGrow: 75,
        active: true,
        defaultActive: true,
        like: true,
        filterMode: FILTER_MODE.SEARCH_FIELD,
        multiple: true,
        placeholder: 'Search TestCase',
        sSearch: [],
        filterDisplayed: false,
    },
    {
        displayName: 'Labels',
        apiName: 'lab.label',
        contentName: 'labels',
        type: COLUMN_TYPE.LABEL,
        active: true,
        defaultActive: true,
        sortable: false,
        searchable: true,
        filterDisplayed: false,
        flexGrow: 250,
        multiple: true,
        placeholder: 'Select Labels',
        sSearch: []
    },
    {
        displayName: 'Description',
        apiName: 'tec.description',
        contentName: 'description',
        type: COLUMN_TYPE.LONGTEXT,
        flexGrow: 250,
        defaultActive: true,
        active: true,
        filterDisplayed: false,
        like: true,
        filterMode: FILTER_MODE.SEARCH_FIELD,
        multiple: true,
        placeholder: 'Search Description...',
        sSearch: []

    },
    {
        displayName: 'Status',
        apiName: 'tec.status',
        contentName: 'status',
        active: true,
        defaultActive: true,
        searchable: true,
        filterDisplayed: false,
        flexGrow: 100,
        multiple: true,
        placeholder: 'Select status',
        sSearch: []
    },
    {
        displayName: 'Priority',
        apiName: 'tec.priority',
        contentName: 'priority',
        active: true,
        defaultActive: true,
        filterDisplayed: false,
        searchable: true,
        flexGrow: 100,
        multiple: true,
        placeholder: 'Select Priority',
        sSearch: []

    },
    {
        displayName: 'System',
        apiName: 'app.system',
        contentName: 'system',
        active: false,
        filterDisplayed: false,
        searchable: true,
        multiple: true,
        placeholder: 'Select System...',
        sSearch: []

    },
    {
        displayName: 'Global Activation',
        apiName: 'tec.tcactive',
        contentName: 'tcActive',
        searchable: true,
        active: false,
        filterDisplayed: false,
        type: COLUMN_TYPE.BOOLEAN,
        multiple: false,
        placeholder: 'Select Gloabl Activation',
        sSearch: []

    },
    {
        displayName: 'CountryList',
        apiName: '',
        type: COLUMN_TYPE.LIST,
        contentName: 'countryList',
        flexGrow: 200,
        active: false,
        filterDisplayed: false,
        sSearch: []

    },
    /****/
    {
        displayName: 'Stickers',
        apiName: 'lab.labelsSTICKER',
        contentName: 'labelsSTICKER',
        type: COLUMN_TYPE.LABEL,
        active: false,
        sortable: false,
        filterDisplayed: false,
        multiple: true,
        placeholder: 'Select Stickers',
        sSearch: []

    },
    {
        displayName: 'Requirements',
        apiName: 'lab.labelsREQUIREMENT',
        contentName: 'labelsREQUIREMENT',
        type: COLUMN_TYPE.LABEL,
        active: false,
        filterDisplayed: false,
        sortable: false,
        multiple: true,
        placeholder: 'Select Requirement',
        sSearch: []

    },
    {
        displayName: 'Batteries',
        apiName: 'lab.labelsBATTERY',
        contentName: 'labelsBATTERY',
        type: COLUMN_TYPE.LABEL,
        active: false,
        filterDisplayed: false,
        sortable: false
    },
    {
        displayName: 'QA Activation',
        apiName: 'tec.tcactive',
        contentName: 'activePROD',
        active: false,
        filterDisplayed: false,
        type: COLUMN_TYPE.BOOLEAN
    },
    {
        displayName: 'UAT Activation',
        apiName: 'tec.tcactive',
        contentName: 'activeQA',
        active: false,
        filterDisplayed: false,
        type: COLUMN_TYPE.BOOLEAN
    },
    {
        displayName: 'PROD Activation',
        apiName: 'tec.tcactive',
        contentName: 'activeUAT',
        active: false,
        filterDisplayed: false,
        type: COLUMN_TYPE.BOOLEAN
    },
    {
        displayName: 'Function',
        apiName: 'tec.function',
        contentName: 'function',
        active: false,
        filterDisplayed: false,
        like: true,
        filterMode: FILTER_MODE.SEARCH_FIELD,
        multiple: true,
        placeholder: 'Select Function',
        sSearch: []

    },
    {
        displayName: 'Project',
        apiName: 'tec.project',
        contentName: 'Project',
        filterDisplayed: false,
        active: false,
        multiple: true,
        placeholder: 'Select Project',
        sSearch: []

    },
    {
        displayName: 'Origine',
        apiName: 'tec.origine',
        contentName: 'origine',
        filterDisplayed: false,
        active: false,
        multiple: true,
        placeholder: 'Select Origine',
        sSearch: []

    },
    {
        displayName: 'Reference Origine',
        apiName: 'tec.refOrigine',
        contentName: 'refOrigin',
        active: false,
        filterDisplayed: false,
        like: true,
        filterMode: FILTER_MODE.SEARCH_FIELD,
        multiple: true,
        placeholder: 'Select Reference Origine',
        sSearch: []

    },
    {
        displayName: 'Type',
        apiName: 'tec.group',
        contentName: 'group',
        searchable: true,
        active: false,
        multiple: true,
        placeholder: 'Select Type',
        sSearch: [],
        filterDisplayed: false,

    },
    {
        displayName: 'Date Created',
        apiName: 'tec.dateCreated',
        contentName: 'dateCreated',
        active: false,
        filterDisplayed: false,
        like: true,
        filterMode: FILTER_MODE.SEARCH_FIELD,
        multiple: true,
        placeholder: 'Select Date Created',
        sSearch: []

    },
    {
        displayName: 'User Created',
        apiName: 'tec.usrCreated',
        contentName: 'usrCreated',
        filterDisplayed: false,
        searchable: true,
        active: false,
        multiple: true,
        placeholder: 'Select User',
        sSearch: []

    },
    {
        displayName: 'TestCase Version',
        apiName: 'tec.testCaseVersion',
        contentName: 'testCaseVersion',
        filterDisplayed: false,
        active: false,
        multiple: true,
        placeholder: 'Select TestCase Version',
        sSearch: []

    },
    {
        displayName: 'Date Modification',
        apiName: 'tec.dateModif',
        contentName: 'dateModif',
        active: false,
        filterDisplayed: false,
        like: true,
        filterMode: FILTER_MODE.SEARCH_FIELD,
        multiple: true,
        placeholder: 'Select Date Modification',
        sSearch: []

    },
    {
        displayName: 'User Modification',
        apiName: 'tec.usrModif',
        contentName: 'usrModif',
        filterDisplayed: false,
        active: false,
        multiple: true,
        placeholder: 'Select User Modification',
        sSearch: []
    }];
