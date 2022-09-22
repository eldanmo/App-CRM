import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import {useNavigate} from 'react-router-dom'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente,cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                .min(3,'Debe tener más de 2 caracteres')    
                .max(40,'Debe tener menos de 40 caracteres')    
                .required('El nombre es obligatorio'),
        empresa: Yup.string()
                .min(3,'Debe tener más de 2 caracteres')     
                .required('La empresa es obligatoria'),
        email: Yup.string()
                .email('Email no valido')
                .min(4,'Debe tener más de 4 caracteres')     
                .required('El E-mail obligatorio'),
        telefono: Yup.string()
                .min(7,'Debe tener minimo 7 caracteres caracteres'),
        })

    const handleSubmit = async (valores)=>{
        try {
            let respuesta
            if(cliente.id) {
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`

                respuesta = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(valores),
                headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }else {
                const url = import.meta.env.VITE_API_URL

                respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(valores),
                headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }

            await respuesta.json()

            navigate('/')

        } catch (error) {
            console.log(error)
        }
    }
  return (

    cargando ? <Spinner/> : (
        <div className="bg-gray-200 mt-10 px-5 py-10 rounded-md shdow-md md:3/4 mx-auto" >
            <h1 className="text-gray-600 font-bold text-xl uppercase text-center" > {cliente.nombre ? 'Editar' : 'Agregar'}  Cliente</h1>
            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? "",
                    empresa: cliente?.empresa ?? "",
                    email: cliente?.email ?? "",
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? ""
                }}

                enableReinitialize={true}

                onSubmit={async (valores, {resetForm})=>{
                    await handleSubmit(valores)
                    resetForm()
                }}

                validationSchema={nuevoClienteSchema}
            >
                {({errors, touched})=>{
                    return(
                <Form>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="text-gray-800">Nombre:</label>
                        <Field 
                            id="nombre" name="nombre" type="text" className="mt-2 block w-full p-3 bg-gray-50" placeholder="Nombre del Cliente"
                        />
                        {errors.nombre && touched.nombre ? (
                            <Alerta>{errors.nombre}</Alerta>
                        ): null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="empresa" className="text-gray-800">Empresa:</label>
                        <Field 
                            id="empresa" name="empresa" type="text" className="mt-2 block w-full p-3 bg-gray-50" placeholder="Nombre de la Empresa"
                        />
                        {errors.empresa && touched.empresa ? (
                            <Alerta>{errors.empresa}</Alerta>
                        ): null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-gray-800">E-mail:</label>
                        <Field 
                            id="email" name="email" type="email" className="mt-2 block w-full p-3 bg-gray-50" placeholder="E-mail de la Empresa"
                        />
                        {errors.email && touched.email ? (
                            <Alerta>{errors.email}</Alerta>
                        ): null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="telefono" className="text-gray-800">Teléfono:</label>
                        <Field 
                            id="telefono" name="telefono" type="tel" className="mt-2 block w-full p-3 bg-gray-50" placeholder="Teléfono de la Empresa"
                        />
                        {errors.telefono && touched.telefono ? (
                            <Alerta>{errors.telefono}</Alerta>
                        ): null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="notas" className="text-gray-800">Notas:</label>
                        <Field 
                            id="notas" name="notas" type="tel" className="mt-2 block w-full p-3 bg-gray-50  h-40" placeholder="Notas de la Empresa" as="textarea"
                        />
                    </div>
                    <input type="submit" value={cliente.nombre ? 'Editar cliente' : 'Agregar cliente'} className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg' />
                </Form>
                )}}
            </Formik>
        </div>
    )
  )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario