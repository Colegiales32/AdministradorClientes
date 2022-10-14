import { Outlet,Link, useLocation } from "react-router-dom";

const Layout = () => {
const location = useLocation()

  return (
    <div className="sm:block md:flex md:min-h-screen" >
      <aside className="sm:block md:w-1/4 sm:text-center bg-blue-900 px-5 py-10">
        <h2 className="text-xl font-bold text-center text-white">
          CRM - Clientes
        </h2>

<nav className="mt-10">
 <Link className={`${location.pathname === '/' ? 'text-blue-400':'text-white'} text-2xl block mt-2 hover:text-blue-200`}  to="">Clientes</Link>
 <Link className={`${location.pathname === '/clientes/nuevo' ? 'text-blue-400':'text-white'} text-2xl block mt-2 hover:text-blue-200`} to="/clientes/nuevo">Nuevo Cliente</Link>
</nav>

      </aside>

      <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
