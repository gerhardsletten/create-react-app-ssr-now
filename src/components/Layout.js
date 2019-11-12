import React from 'react'
import { Box } from '@smooth-ui/core-sc'
import { Link, Route } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`
const Header = styled.header`
  padding: 1rem 0;
  background: palevioletred;
  color: white;
  margin-bottom: 1rem;
`
const Content = styled.main`
  flex: 1;
`
const Footer = styled.footer`
  text-align: center;
  padding: 1rem;
  color: $ccc;
  font-size: 0.8rem;
  padding: 1rem 0;
`
const Wrapper = styled(Box)`
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 1rem;
`
const Logo = styled(Link)`
  display: inline-block;
  margin-right: 1rem;
  font-weight: bold;
`
const MenuLink = styled(Link)`
  display: inline-block;
  margin-right: 1rem;
  ${p =>
    p.active &&
    `
    border-bottom: 1px solid white;
  `}
`

const NavLink = ({ title, slug }) => (
  <Route
    path={slug}
    exact
    children={({ match }) => (
      <MenuLink to={slug} active={match}>
        {title}
      </MenuLink>
    )}
  />
)

const Layout = ({ menu, children }) => (
  <Container>
    <Header>
      <Wrapper
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Logo to="/">Logo</Logo>
        <div>
          {menu && menu.map((item, i) => <NavLink key={i} {...item} />)}
        </div>
      </Wrapper>
    </Header>
    <Content>
      <Wrapper>{children}</Wrapper>
    </Content>
    <Footer>
      <Wrapper>A footer here</Wrapper>
    </Footer>
  </Container>
)

export default Layout
