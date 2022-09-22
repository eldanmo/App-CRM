import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"

const VerCliente = () => {
    const {id} = useParams()

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(false)

    const { nombre, empresa, telefono, email, notas } = cliente

    useEffect(()=>{
        setCargando(!cargando)
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
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
    cargando ? <Spinner/> : Object.keys(cliente).length === 0 ? <p className="p-10"> No hay resultados </p> : (
    <div className="p-10">
            <>
            <h1 className="font-black text-4xl text-blue-900">Ver cliente: {nombre}</h1>
            <p className="mt-3">Información del cliente</p>

            {nombre && (
                <p className="text-2xl text-gray-600 mt-10">
                <span className="text-gray-800 uppercase font-bold">Cliente: </span>
                {nombre}
                </p>
            )}
            {empresa && (
                <p className="text-2xl text-gray-600 mt-2">
                <span className="text-gray-800 uppercase font-bold">Empresa: </span>
                {empresa}
                </p>
            )}
            {telefono && (
                <p className="text-2xl text-gray-600 mt-2">
                <span className="text-gray-800 uppercase font-bold">Teléfono: </span>
                <a href={`tel:${telefono}`}>{telefono}</a>
                </p>
            )}
            {email && (
                <p className="text-2xl text-gray-600 mt-2">
                <span className="text-gray-800 uppercase font-bold">Email: </span>
                <a href={`mailto:${email}`}>{email}</a>
                </p>
            )}
            {notas && (
                <p className="text-2xl text-gray-600 mt-2">
                <span className="text-gray-800 uppercase font-bold">Notas: </span>
                {notas}
                </p>
            )}
        </>
    </div>
    )
  )
}

export default VerCliente