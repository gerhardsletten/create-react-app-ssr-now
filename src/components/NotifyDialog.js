import React from 'react'
import { Button, Box } from '@smooth-ui/core-sc'
import styled from 'styled-components'

const Container = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  color: #fff;
`

const NotifyDialog = ({ title, onOk, onCancel }) => (
  <Container backgroundColor="dark">
    <Box mb={3} fontWeight="bold">
      {title}
    </Box>
    <Button mr={10} variant="success" onClick={onOk}>
      Ok
    </Button>
    <Button variant="light" onClick={onCancel}>
      Cancel
    </Button>
  </Container>
)

export default NotifyDialog
