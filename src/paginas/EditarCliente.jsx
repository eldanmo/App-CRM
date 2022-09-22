import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import Formulario from "../components/Formulario"

const EditarCliente = () => {

  const {id} = useParams()

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(false)

    useEffect(()=>{
        setCargando(!cargando)
        const obtenerClienteAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
            setCargando(false)
        }
        obtenerClienteAPI()
    },[])
  return (
    <div className="p-10">
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Edita los datos del cliente seleccionado</p>

      { cliente.nombre ? (
         <Formulario
          cliente={cliente}
          cargando={cargando}
        />
      ) : <p>Id de cliente inexistente</p> }
       

      
    </div>
  )
}

export default EditarCliente