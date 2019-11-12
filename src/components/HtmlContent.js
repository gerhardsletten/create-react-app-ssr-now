import React from 'react'
import styled from 'styled-components'
import { Box } from '@smooth-ui/core-sc'

const Container = styled(Box)`
  & p {
    margin-bottom: 1rem;
  }
  & h2,
  & h3,
  & h4 {
    font-size: 2rem;
    font-weight: bold;
    clear: both;
    margin: 2rem 0 0.5rem;
  }
  & *:first-child {
    margin-top: 0;
  }
  & a {
    color: blue;
    font-weight: bold;
  }
  & ul,
  & ol {
    margin: 0 0 1rem 2rem;
    & li {
      margin-bottom: 0.5rem;
    }
  }
  & .video-wrapper {
    display: block;
    position: relative;
    padding-top: 56.2%;
    & iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
`

const HtmlContent = ({ content, wrapIframe, ...rest }) => {
  const contentEnhanced = content
    .replace('<iframe', '<span class="video-wrapper"><iframe')
    .replace('</iframe>', '</iframe></span>')
  return (
    <Container
      {...rest}
      dangerouslySetInnerHTML={{ __html: contentEnhanced }}
    />
  )
}

export default HtmlContent
