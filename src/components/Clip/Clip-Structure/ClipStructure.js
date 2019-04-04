import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import { connect, ReactReduxContext } from 'react-redux';
import { Grid, Actions } from 'react-redux-grid';

import * as _ from 'lodash';

export const pageSize = 20;

export const events = {
  HANDLE_CELL_CLICK: (cell, reactEvent, id, browserEvent) => {
    console.log('On Cell Click Event');
  },
  HANDLE_CELL_DOUBLE_CLICK: (cell, reactEvent, id, browserEvent) => {
    console.log('On Cell Double Click Event');
  },
  HANDLE_ROW_CLICK: (row, reactEvent, id, browserEvent) => {
    console.log('On Row Click Event');
  },
  HANDLE_ROW_DOUBLE_CLICK: (row, reactEvent, id, browserEvent) => {
    console.log('On Row Double Click Event');
  },
  HANDLE_BEFORE_SELECTION: () => {
    console.log('On Before Selection')
  },
  HANDLE_AFTER_SELECTION: () => {
    console.log('On After Selection');
  },
  HANDLE_AFTER_INLINE_EDITOR_SAVE: () => {
    console.log('On After Save Inline Editor Event');
  },
  HANDLE_BEFORE_BULKACTION_SHOW: () => {
    console.log('On Before Bulk Action Show');
  },
  HANDLE_AFTER_BULKACTION_SHOW: () => {
    console.log('On After Bulk Action Show');
  }
};

export const plugins = {
  COLUMN_MANAGER: {
    resizable: true,
    moveable: true,
    sortable: {
      enabled: true,
      method: 'local',
      // sortingSource: pagingDataSource
    }
  },
  EDITOR: {
    type: 'inline',
    enabled: true
  },
  PAGER: {
    enabled: true,
    // pagingType: 'remote',
    // pagingSource: pagingDataSource
  },
  LOADER: {
    enabled: true
  },
  SELECTION_MODEL: {
    mode: 'checkbox-multi',
    enabled: true,
    allowDeselect: true,
    activeCls: 'active',
    selectionEvent: 'singleclick'
  },
  ERROR_HANDLER: {
    defaultErrorMessage: 'AN ERROR OCURRED',
    enabled: true
  }
};

let testData = [
  {
    'Name': 'Sawyer',
    'Status': 'open'
  },
  {
    'Name': 'Chadwick',
    'Status': 'close'
  }
];

const stateKey = 'tree';

const complexData = {
  showTreeRootNode: false,
  // dataSource: treeDataSource,
  gridType: 'grid',
  dragAndDrop: true,
  columns: [
    {
      name: 'Name',
      width: '30%',
      className: 'additional-class',
      // dataIndex: 'Name',
      sortable: false,
      expandable: true
    },
    {
      name: 'Status',
      // dataIndex: 'Status',
      sortable: false,
      className: 'additional-class'
    }
  ],
  data : testData,
  plugins: {
    // ...plugins,
    GRID_ACTIONS: null,
    SELECTION_MODEL: {
      mode: 'single'
    },
    PAGER: {
      enabled: false
    },
    BULK_ACTIONS: {
      enabled: false
    }
  },
  events,
  stateKey
};

// @connect(
//   state => ({
//     user: state.auth.user
//   }),
//   {
//   },
//   null,
//   { context: ReactReduxContext})
export default class ClipStructure extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <Grid {...complexData} store={this.props.store}/>
    );
  }
}

