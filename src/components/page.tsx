import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface PageProps {
  children: ReactNode;
  currentPage: number | undefined;
  number: number;

  action?: { name: string; handler: Function };
  title?: string;
}

interface ContainerProps {
  isVisible: boolean;
}

const ActionName = styled.div`
  background: none;
  border: none;
  color: #EDF2F7;
  display: block;
  letter-spacing: 0.05em;
  text-decoration: none;
  text-transform: uppercase;
`;
const Container = styled.div<ContainerProps>`
  bottom: 0;
  display: ${ props => props.isVisible ? 'flex' : 'none' };
  flex-direction: column;
  left: ${ props => props.isVisible ? 0 : 5000 }px;
  padding-bottom: 3rem;
  position: absolute;
  right: 0;
  top: 0;
`;
const Content = styled.div`
  flex: 1;
  padding: 0rem 2rem;
`;
const Footer = styled.div`
  background: #4A5568;
  bottom: 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: flex-end;
  left: 0;
  padding: 1rem;
  position: absolute;
  right: 0;
`;
const Header = styled.div`
  padding: 1.5rem 2rem;
`;
const Heading = styled.h1`
  font-size: 1.25rem;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
`;
const NextPageLink = styled(Link)`
  background: none;
  border: none;
  color: #EDF2F7;
  display: block;
  letter-spacing: 0.05em;
  text-decoration: none;
  text-transform: uppercase;
`;

export default function Page({ action, children, currentPage, number, title }: PageProps) {
  currentPage = currentPage || 1;

  return (
    <Container isVisible={ currentPage === number }>
      <Header>
        <Heading>
          Steg { number } { title ? ` - ${ title }` : '' }
        </Heading>
      </Header>

      <Content>
        { children }
      </Content>
      <Footer>
        {
          action ?
            <ActionName onClick={ () => action.handler() }>{ action.name }</ActionName> :
            <NextPageLink to={ `/?page=${ number + 1 }` }>Nästa</NextPageLink>
        }
      </Footer>
    </Container>
  );
}
