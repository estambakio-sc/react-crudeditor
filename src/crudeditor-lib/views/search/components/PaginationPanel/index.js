import React, { PureComponent } from 'react';
import { Pagination, Dropdown, MenuItem } from 'react-bootstrap';

import connect from '../../../../connect';
import { searchInstances } from '../../actions';
import './styles.css';

import {
  getPageMax,
  getPageOffset,
  getTotalCount
} from '../../selectors';

@connect({
  max: getPageMax,
  offset: getPageOffset,
  totalCount: getTotalCount
}, {
  searchInstances
})
export default class extends PureComponent {
  handlePaginate = activePage => this.props.searchInstances({
    offset: (activePage - 1) * this.props.max
  })

  handleMaxChange = pageMax => this.props.searchInstances({ max: pageMax })

  render() {
    const {totalCount, max, offset } = this.props;

    return (
      <div>
        <div className='pull-right paginate'>
          <Dropdown id='max-dropdown' onSelect={this.handleMaxChange}>
            <Dropdown.Toggle>
              Results per page: <b>{max}</b>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <MenuItem eventKey={10} active={max === 10}>10</MenuItem>
              <MenuItem eventKey={30} active={max === 30}>30</MenuItem>
              <MenuItem eventKey={50} active={max === 50}>50</MenuItem>
              <MenuItem eventKey={100} active={max === 100}>100</MenuItem>
              <MenuItem eventKey={1000} active={max === 1000}>1000</MenuItem>
              <MenuItem divider={true} />
              <MenuItem eventKey={-1} active={max === -1}>All</MenuItem>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className='pull-right'>
          <div className='paginate' style={{display: 'flex', alignItems: 'center'}}>
            <div className='pull-left'>
              {totalCount} item(s) found
            </div>
            <div className='pull-left'>
              <Pagination
                activePage={(offset / max) + 1}
                onSelect={this.handlePaginate}
                items={Math.ceil(totalCount / max)}
                maxButtons={10}
                boundaryLinks
                first
                last
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
