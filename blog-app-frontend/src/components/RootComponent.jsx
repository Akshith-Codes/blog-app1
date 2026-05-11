import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'
 
function RootComponent() {
  return (
    <div className="min-h-screen bg-[#0f0e0c] flex flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
 
export default RootComponent
 