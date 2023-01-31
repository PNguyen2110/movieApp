import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from '../Molecules'
import styled from 'styled-components'

const MainLayout = () => {
  return (
    <Container className='MainLayout'>

      <Header />
      <main className='main-content'> <Outlet /> </main>
      <Footer />

    </Container >
  )
}

export default MainLayout

const Container = styled.div`
 &.MainLayout{
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .Header{
  }
  .main-content{
    flex: 1;
  }
  .Footer{
  }
 }
`