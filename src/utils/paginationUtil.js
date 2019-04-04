import lodash from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Pager from 'react-pager';
import { optionsTransform, optionsChange } from 'utils/formUtil';

export function detectPageUpdate(newData, oldPagination, setNewState, reloadPageData) {
  if (newData) {
    console.log('newData', newData);
  }
  if (newData && lodash.isNumber(newData.total)) {
    let newPagination = {
      ...oldPagination
    };
    newPagination.total = newData.total;
    newPagination.totalPage = Math.ceil(newPagination.total / (newPagination.pageSize || 10));
    // console.log('oldPagination', oldPagination, 'newPagination', newPagination);
    if (oldPagination.current > newPagination.totalPage) {
      newPagination.current = 0;
      // console.log('reloadPage', newPagination);
      reloadPageData(newPagination.current, newPagination.pageSize, newPagination.total);
    } else {
      // console.log('setState', newPagination);
      setNewState(newPagination);
    }
  }
}

export function handlePageChangedUpdate(oldPagination, pageNum, pageSize, setNewState) {
  if (oldPagination) {
    let newPagination = {
      ...oldPagination,
      current: pageNum,
      pageSize: pageSize || oldPagination.pageSize
    };
    // console.log('handlePageChangedUpdate', newPagination);
    setNewState(newPagination);
  }
}
export function emptyPaginationState() {
  return {
    total: 0,
    totalPage: 5,
    current: 0,
    visiblePage: 5,
    pageSize: 10,
  };
}

export function validatePaginationState(newPagination, pageNum) {
  newPagination.current = pageNum !== undefined && lodash.isNumber(pageNum) ? pageNum : 0;
  if (newPagination.current < 0) {
    newPagination.current = 0;
  }
}

export const handlePageSizeOptions = (value, total)=>{
  const listSize = [
    { value: 10, label: '10'},
    { value: 50, label: '50'},
    { value: 100, label: '100'},
    { value: 200, label: '200'},
    { value: total, label: 'All'}
  ];
  const result = optionsTransform(listSize, value, 'value', 'label');
  return result;
};

export const PagerWithSize = (props) => {
  if (!props.pageState || !props.pageState.totalPage) {
    return (
      <div>No Entry</div>
    );
  }
  return (
    <div className="row">
      <div className="col-md-8 col-lg-8">
        <Pager
          style={{margin: '0px'}}
          total={props.pageState.totalPage}
          current={props.pageState.current}
          visiblePages={props.pageState.visiblePage}
          titles={{
            first: 'First',
            prev: '\u00AB',
            prevSet: '...',
            nextSet: '...',
            next: '\u00BB',
            last: 'Last'
          }}
          className="pagination-sm"
          onPageChanged={(pageNum)=>{
            props.handlePageChanged(pageNum);
          }}
        />
      </div>
      <div className="col-md-1 col-lg-1" style={{margin: '20px 0px'}}>
        {!props.isAutoReload &&
        <a className="btn btn-default"><i className="glyphicon glyphicon-refresh"/></a>
        }
      </div>
      <div className="col-md-2 col-lg-2" style={{margin: '20px 0px'}}>
        <Select
          style={{paddingTop: '4px', color: '#000'}}
          closeMenuOnSelect={true}
          value={handlePageSizeOptions(props.pageState.pageSize, props.pageState.total)}
          onChange={(selectedOptions)=>{
            console.log(selectedOptions);
            if (props.isAutoReload) {
              props.handlePageChanged(0, selectedOptions.value);
            }
          }}
          options={handlePageSizeOptions(null, props.pageState.total)}
        />
      </div>
      <div className="col-md-1 col-lg-1" style={{margin: '20px 0px'}}>
          Entries
      </div>
    </div>
  );
};
PagerWithSize.propTypes = {
  isAutoReload: PropTypes.bool,
  handlePageChanged: PropTypes.func,
  pageState: PropTypes.object,
};
