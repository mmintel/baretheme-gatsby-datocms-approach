import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const CardContext = React.createContext();

function useCardContext() {
  const context = React.useContext(CardContext);
  if (!context) {
    throw new Error(
      'Card compound components cannot be rendered outside the Card component',
    );
  }
  return context;
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.raised};
  box-shadow: ${(props) => props.theme.shadow(2)};
  border-radius: ${(props) => props.theme.radius(1)};
`;

const Card = (props) => (
  <CardContext.Provider value={{}}>
    <StyledCard {...props} />
  </CardContext.Provider>
);

const StyledCardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(0)};

  ${(props) => props.center && css`
    align-items: center;
    justify-content: center;
  `}
`;

const CardBody = ({ center, ...props }) => {
  useCardContext();
  return <StyledCardBody center={center} {...props} />;
};

CardBody.defaultProps = {
  center: false,
};

CardBody.propTypes = {
  center: PropTypes.bool,
};

const StyledCardHead = styled.div`
  padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(0)};
  border-bottom: 1px solid ${(props) => props.theme.color.faded};
`;

const CardHead = (props) => {
  useCardContext();
  return <StyledCardHead {...props} />;
};

CardBody.displayName = 'Card.Body';
CardHead.displayName = 'Card.Head';

Card.Body = CardBody;
Card.Head = CardHead;

export default Card;
