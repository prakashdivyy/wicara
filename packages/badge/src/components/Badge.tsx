import * as React from 'react';
import styled from 'styled-components';

import themes from '../theme';
import styles from '../styles';
import ThemedComponent, { variables } from '@kata-kit/theme';

export type BadgeColors =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export interface BadgeProps {
  /** The color of the badge. */
  color?: BadgeColors;
  /** Additional CSS classes to give to the component. */
  className?: string;
}

export default class Badge extends React.Component<BadgeProps> {
  render() {
    const { children, color } = this.props;

    return (
      <ThemedComponent color={color} themes={themes}>
        {themeAttributes => <Root {...themeAttributes}>{children}</Root>}
      </ThemedComponent>
    );
  }
}

const Root = styled('span')`
  ${styles}
  border-radius: ${variables.borderRadiuses.borderRadiusXs};
  color: ${props => props.textColor};
  background-color: ${props => props.backgroundColor};
`;
