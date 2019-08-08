import { Column } from 'src/app/shared/model/column.model';

export var TestCasesColumnsData: Column[] = [
    {
        displayName: 'Application',
        databaseName: 'tec.application',
        contentName: 'application',
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
        displayName: 'Test Folder',
        databaseName: 'tec.test',
        contentName: 'test',
        active: true,
        flexGrow: 100,
        defaultActive: true,
        searchable: true,
        param: {
            multiple: true,
            field: 'test',
            placeholder: 'Select test',
        },
        sSearch: []

    },
    {
        displayName: 'TestCase ID',
        databaseName: 'tec.testCase',
        contentName: 'testCase',
        flexGrow: 75,
        active: true,
        defaultActive: true,
        like: true,
        param: {
            multiple: true,
            field: 'testCase',
            placeholder: 'Search TestCase',
        },
        sSearch: []
    }, ///
    {
        displayName: 'Labels',
        databaseName: 'lab.label',
        contentName: 'labels',
        type: 'label',
        active: true,
        defaultActive: true,
        sortable: false,
        searchable: true,
        dropActive: false,
        flexGrow: 250,
        param: {
            multiple: true,
            field: 'label',
            placeholder: 'Select Labels',
        },
        sSearch: []
    },
    {
        displayName: 'Description',
        databaseName: 'tec.description',
        contentName: 'description',
        type: 'longtext',
        flexGrow: 250,
        defaultActive: true,
        active: true,
        dropActive: false,
        like: true,
        param: {
            multiple: true,
            field: 'description',
            placeholder: 'Search Description...',
        },
        sSearch: []

    },
    {
        displayName: 'Status',
        databaseName: 'tec.status',
        contentName: 'status',
        active: true,
        defaultActive: true,
        searchable: true,
        dropActive: false,
        flexGrow: 100,
        param: {
            multiple: true,
            field: 'status',
            placeholder: 'Select status',
        },
        sSearch: []
    },
    {
        displayName: 'Priority',
        databaseName: 'tec.priority',
        contentName: 'priority',
        active: true,
        defaultActive: true,
        dropActive: false,
        searchable: true,
        flexGrow: 100,
        param: {
            multiple: true,
            field: 'priority',
            placeholder: 'Select Priority',
        },
        sSearch: []

    },
    {
        displayName: 'System',
        databaseName: 'app.system',
        contentName: 'system',
        active: false,
        dropActive: false,
        searchable: true,
        param: {
            multiple: true,
            field: 'description',
            placeholder: 'Select System...',
        },
        sSearch: []

    },
    {
        displayName: 'Global Activation',
        databaseName: 'tec.tcactive',
        contentName: 'tcActive',
        searchable: true,
        active: false,
        dropActive: false,
        type: 'boolean',
        param: {
            multiple: false,
            field: 'tcActive',
            placeholder: 'Select Gloabl Activation',
        },
        sSearch: []

    },
    {
        displayName: 'CountryList',
        databaseName: '',
        type: 'list',
        contentName: 'countryList',
        flexGrow: 200,
        active: false,
        
        sSearch: []

    },

    /****/
    {
        displayName: 'Stickers',
        databaseName: 'lab.labelsSTICKER',
        contentName: 'labelsSTICKER',
        type: 'label',
        active: false,
        sortable: false,
        dropActive: false,
        param: {
            multiple: true,
            field: 'labelsSTICKER',
            placeholder: 'Select Stickers',
        },
        sSearch: []

    },//
    {
        displayName: 'Requirements',
        databaseName: 'lab.labelsREQUIREMENT',
        contentName: 'labelsREQUIREMENT',
        type: 'label',
        active: false,
        dropActive: false,
        sortable: false,
        param: {
            multiple: true,
            field: 'labelsREQUIREMENT',
            placeholder: 'Select Requirement',
        },
        sSearch: []

    },//
    {
        displayName: 'Batteries',
        databaseName: 'lab.labelsBATTERY',
        contentName: 'labelsBATTERY',
        type: 'label',
        active: false,
        dropActive: false,
        sortable: false
    },//
    {
        displayName: 'QA Activation',
        databaseName: 'tec.tcactive',
        contentName: 'activePROD',
        active: false,
        dropActive: false,
        type: 'boolean'
    },
    {
        displayName: 'UAT Activation',
        databaseName: 'tec.tcactive',
        contentName: 'activeQA',
        active: false,
        dropActive: false,
        type: 'boolean'
    },
    {
        displayName: 'PROD Activation',
        databaseName: 'tec.tcactive',
        contentName: 'activeUAT',
        active: false,
        dropActive: false,
        type: 'boolean'
    },
    {
        displayName: 'Function',
        databaseName: 'tec.function',
        contentName: 'function',
        active: false,
        dropActive: false,
        like: true,

        param: {
            multiple: true,
            field: 'function',
            placeholder: 'Select Function',
        },
        sSearch: []

    },
    {
        displayName: 'Project',
        databaseName: 'tec.project',
        contentName: 'Project',
        dropActive: false,
        active: false,

        param: {
            multiple: true,
            field: 'Project',
            placeholder: 'Select Project',
        },
        sSearch: []

    },
    {
        displayName: 'Origine',
        databaseName: 'tec.origine',
        contentName: 'origine',
        dropActive: false,
        active: false,

        param: {
            multiple: true,
            field: 'origine',
            placeholder: 'Select Origine',
        },
        sSearch: []

    },
    {
        displayName: 'Reference Origine',
        databaseName: 'tec.refOrigine',
        contentName: 'refOrigin',
        active: false,
        dropActive: false,
        like: true,
        param: {
            multiple: true,
            field: 'refOrigin',
            placeholder: 'Select Reference Origine',
        },
        sSearch: []

    },
    {
        displayName: 'Type',
        databaseName: 'tec.group',
        contentName: 'group',
        searchable: true,
        active: false,
        param: {
            multiple: true,
            field: 'group',
            placeholder: 'Select Type',
        },
        sSearch: []

    },
    {
        displayName: 'Date Created',
        databaseName: 'tec.dateCreated',
        contentName: 'dateCreated',
        active: false,
        dropActive: false,
        like: true,
        param: {
            multiple: true,
            field: 'dateCreated',
            placeholder: 'Select Date Created',
        },
        sSearch: []

    },
    {
        displayName: 'User Created',
        databaseName: 'tec.usrCreated',
        contentName: 'usrCreated',
        dropActive: false,
        searchable: true,
        active: false,
        param: {
            multiple: true,
            field: 'user',
            placeholder: 'Select User',
        },
        sSearch: []

    },
    {
        displayName: 'TestCase Version',
        databaseName: 'tec.testCaseVersion',
        contentName: 'testCaseVersion',
        dropActive: false,
        active: false,
        param: {
            multiple: true,
            field: 'testCaseVersion',
            placeholder: 'Select TestCase Version',
        },
        sSearch: []

    },
    {
        displayName: 'Date Modification',
        databaseName: 'tec.dateModif',
        contentName: 'dateModif',
        active: false,
        dropActive: false,
        like: true,
        param: {
            multiple: true,
            field: 'dateModif',
            placeholder: 'Select Date Modification',
        },
        sSearch: []

    },
    {
        displayName: 'User Modification',
        databaseName: 'tec.usrModif',
        contentName: 'usrModif',
        dropActive: false,
        active: false,
        param: {
            multiple: true,
            field: 'usrModif',
            placeholder: 'Select User Modification',
        },
        sSearch: []

    },];