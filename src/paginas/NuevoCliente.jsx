import Formulario from "../components/Formulario"

const NuevoCliente = () => {
  return (
    <div className="p-10">
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">Diligencia los siguientes campos para registrar un cliente</p>
      <Formulario/>
    </div>
  )
}

export default NuevoCliente