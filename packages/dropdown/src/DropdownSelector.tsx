import * as React from 'react';

import Dropdown from './Dropdown';
import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';

import { Circle } from '@kata-kit/loading';
import styled from 'styled-components';

interface DropdownSelectorProps {
  value?: string | number | boolean;
  placeholder?: string;
  block?: boolean;
  loading?: boolean;
  children?: any;
  className?: string;
  onSelect?(value: string): void;
}

interface States {}

class DropdownSelector extends React.PureComponent<
  DropdownSelectorProps,
  States
> {
  static defaultProps = {
    placeholder: 'Select...',
    loading: false,
    block: false
  };

  state: States = {};

  render() {
    const {
      value,
      className,
      placeholder,
      loading,
      block,
      children,
      onSelect
    } = this.props;

    if (loading) {
      return (
        <DropdownLoading block={block}>
          Loading...
          <Circle size={25} className="loading" />
        </DropdownLoading>
      );
    }
    return (
      <Dropdown block={block} onSelect={onSelect} className={className}>
        <DropdownToggle selector block={block} filled={!!value}>
          {(value ? value : placeholder) as string}
        </DropdownToggle>
        <DropdownMenu className="kata-dropdown-selector__menu">
          {children}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

const DropdownLoading = styled<{ block?: boolean }, 'div'>('div')`
  display: ${props => (props.block ? 'block' : 'inline-block')};
  position: relative;
  text-align: left;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #e2e6e8;
  padding: 10px 36px 10px 16px;
  height: 40px;
  font-weight: 500;
  letter-spacing: 0.2px;
  line-height: 1.538rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  .loading {
    position: absolute;
    top: 6px;
    right: 10px;
  }
`;

export default DropdownSelector;
