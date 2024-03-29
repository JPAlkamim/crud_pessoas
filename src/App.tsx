import './App.css'
import { BrowserRouter as Router, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import { Home } from './components/Home'
import { RegisterPerson } from './components/RegisterPerson'
import { ChakraProvider } from '@chakra-ui/react'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/register-person" element={<RegisterPerson />} />
    </>
  )
)

function App() {

  return (
    <>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </>
  )
}

export default App
