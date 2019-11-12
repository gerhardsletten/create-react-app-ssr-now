import React from 'react'
import { Box } from '@smooth-ui/core-sc'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

const Spinner = () => (
  <StyledSpinner viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="4"
    />
  </StyledSpinner>
)

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  width: 3rem;
  height: 3rem;
  & .path {
    stroke: palevioletred;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`

const PageHelper = ({ title, children, loading }) => (
  <Box>
    <Helmet>{title && <title>{title}</title>}</Helmet>
    {loading && (
      <Box p="2rem" display="flex" justifyContent="center">
        <Spinner />
      </Box>
    )}
    {children}
  </Box>
)

export default PageHelper
