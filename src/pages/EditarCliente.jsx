import { Form, useNavigate,useLoaderData,redirect, useActionData } from "react-router-dom"
import { obtenerCliente,editarCliente } from "../data/clientes"
import Formulario from "../components/Formulario"
import Error from "../components/Error"

export async function loader({params}) {
   const cliente = await obtenerCliente(params.clienteId)
   if(Object.values(cliente).length ===  0) {
    throw new Response('',{
        status:404,
        statusText:'El cliente no existe'
    })
   }
   return cliente
   
}


export async function action({request, params}) {
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    const email = formData.get('email')
  
    //Validacion
    const errores = []
    if(Object.values(datos).includes('')) {
      errores.push('Todos los campos son obligatorios')
    }
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  
    if (!regex.test(email)){
      errores.push('El Email no es valido')
    }
  
    //Retornar datos si hay Errores
    if(Object.keys(errores).length) {
      console.log('si hay errores')
      return errores
    }
  
    await editarCliente(params.clienteId,datos)
  
    return redirect('/')
  }




const EditarCliente = () => {
    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()

  return (
    <>
    <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
    <p className="mt-3">
      A continuacion podras editar tu cliente
    </p>
 
    <div className="flex justify-end">
      <button
        className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
        onClick={() => navigate(-1)}
      >
        Volver
      </button>
    </div>
{errores?.length && errores.map((error, i)=> <Error key={i}> {error} </Error>)}
    <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10">


      <Form method='post' noValidate
      >
        <Formulario 
        cliente = {cliente} />
        <input
          type="submit"
          className="bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer"
          value="Editar Cliente"
        />
      </Form>
    </div>
  </>
  )
}

export default EditarCliente