import React, { Component, Fragment } from 'react';

import Select, { components }  from 'react-select';

export default class SingleSelect extends Component {
  state = {
    isClearable: false,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: true,
  };

  toggleClearable = () =>
    this.setState(state => ({ isClearable: !state.isClearable }));
  toggleDisabled = () =>
    this.setState(state => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState(state => ({ isLoading: !state.isLoading }));
  toggleRtl = () => this.setState(state => ({ isRtl: !state.isRtl }));
  toggleSearchable = () =>
    this.setState(state => ({ isSearchable: !state.isSearchable }));
  render() {
    const {
      isClearable,
      isSearchable,
      isDisabled,
      isLoading,
      isRtl,
    } = this.state;
    return (
      <Fragment>
        <Select
          className="basic-single mt-2"
          classNamePrefix="select"
          defaultValue={this.props.options[0]}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color" 
          onChange={this.props.onChange}
          options={this.props.options}
          components={{ 
            Option,
            SingleValue
          }}
        />
      </Fragment>
    );
  }
}

const SingleValue = (props) => {
  let Icon = props.data.Icon
  return (
      <components.SingleValue {...props}>
       <div className="flex items-center">
         <div>
           <Icon className="w-6 h-6" />
         </div>
        <div className="pl-2">
          {props.children}
        </div>
       </div>
      </components.SingleValue>
  );
};

const Option = (props) => {
  let Icon = props.data.Icon
  return (
      <components.Option {...props}>
       <div className="flex items-center">
         <div>
           <Icon className="w-6 h-6" />
         </div>
        <div className="pl-2">
          {props.children}
        </div>
       </div>
      </components.Option>
  );
};