import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import { Home } from './components/Home'
import { ListPerson } from './components/ListPerson'
import { RegisterPerson } from './components/RegisterPerson'
import { ChakraProvider } from '@chakra-ui/react'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/register-person" element={<RegisterPerson />} />
      <Route path="/list-person" element={<ListPerson />} />
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
