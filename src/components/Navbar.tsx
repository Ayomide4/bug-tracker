import {AiTwotoneBug} from 'react-icons/ai'


export const Navbar = () => {
  const links = [
    {name: "Dashboard", route: "/"},
    {name: "Tickets", route: "/tickets"},
    {name: "Admin", route: "/admin"}
  ]

  return (
    <div className='fixed top-0 left-0 w-1/5 m-0 flex flex-col bg-gray-200 h-screen'>
      <div className='flex text-2xl pt-2 items-center'>
        <span className='mx-4 text-3xl'><AiTwotoneBug/></span>
        Bug Tracker
      </div>
      <div className='flex px-3'>
        <ul>
          {
            links.map(link => (<li key={link.name} className='py-2'><a href={link.route}>{link.name}</a></li>))
          }
        </ul>
      </div>
    </div>
  )
}
