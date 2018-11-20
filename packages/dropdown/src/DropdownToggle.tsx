import * as React from 'react';
import omit from 'lodash-es/omit';
import classNames from 'classnames';

import { Button, ButtonColors, ButtonSizes } from '@kata-kit/button';
import styled from 'styled-components';
import { variables } from '@kata-kit/theme';

type DropdownDirection = 'up' | 'down' | 'left' | 'right';

interface DropdownToggleProps {
  tag?: JSX.IntrinsicElements;
  caret?: boolean;
  className?: string;
  color?: ButtonColors;
  size?: ButtonSizes;
  selector?: boolean;
  filled?: boolean;

  // Private properties, should not be used publicly
  block?: boolean;
  isOpen?: boolean;
  direction?: DropdownDirection;
  toggle?: (e: React.SyntheticEvent<any>) => void;
}

const Caret = () => <DropdownCaret className="kata-drop-toggle icon-arrow" />;

class DropdownToggle extends React.Component<DropdownToggleProps> {
  static defaultProps = {
    tag: 'button',
    caret: true
  };

  static displayName = 'DropdownToggle';

  constructor(props: DropdownToggleProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
  }

  onClick(e: React.SyntheticEvent) {
    e.stopPropagation();

    if (this.props.toggle) {
      this.props.toggle(e);
    }
  }

  render() {
    const {
      tag,
      children,
      caret,
      className,
      block,
      isOpen,
      selector,
      filled,
      ...props
    } = omit(this.props, ['direction', 'toggle']);

    const classes = classNames({
      'is-open': this.props.isOpen
    });

    if (!React.isValidElement(children)) {
      return (
        <StyledButton
          {...props}
          block
          className={classNames(
            selector && 'dropdown-selector-button',
            isOpen && 'is-open',
            filled && 'is-filled'
          )}
          color={this.props.color}
          onClick={this.onClick}
        >
          {this.renderChildren()}
        </StyledButton>
      );
    }

    return (
      <SelectorRoot
        {...props}
        block={block}
        className={classes}
        onClick={this.onClick}
      >
        {this.renderChildren()}
      </SelectorRoot>
    );
  }

  private renderChildren() {
    const { caret, direction, children } = this.props;
    if (!caret) {
      return children;
    }

    if (direction === 'left') {
      return (
        <>
          <Caret /> {children}
        </>
      );
    }

    return (
      <>
        {children}
        <Caret />
      </>
    );
  }
}

const DropdownCaret = styled('i')`
  display: inline-block;
  position: absolute;
  top: 9px;
  right: 8px;
  margin-left: 8px;
  font-size: 20px;

  &::before {
    vertical-align: middle;
  }
`;

const StyledButton = styled(Button)`
  position: relative;
  text-align: left;
  background-color: ${variables.colors.white} !important;
  border-radius: 6px;
  border-color: ${variables.colors.gray30} !important;
  padding: 10px 36px 10px 16px;
  height: 40px;
  font-weight: 500;
  letter-spacing: 0.2px;
  line-height: 1.538rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover,
  &:focus {
    outline: none !important;
  }

  &:hover {
    background-color: ${variables.colors.gray20} !important;
  }

  &:focus {
    outline: none !important;
    background-color: ${variables.colors.gray70} !important;
    border-color: ${variables.colors.gray70} !important;
    color: ${variables.colors.white} !important;
  }
`;

const SelectorRoot = styled<DropdownToggleProps, 'div'>('div')`
  display: ${props => (props.block ? 'block' : 'inline-block')};
`;

export default DropdownToggle;
