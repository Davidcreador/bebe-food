import React, { useState, useEffect } from "react"
import api from "./api"
import "./App.css"

function App() {
  const data = {
    records: [
      {
        id: 0,
        name: "Chayote",
        startDate: "20",
        endDate: "23",
        didLike: "Si",
        days: "3",
        comment: ""
      }
    ]
  }
  const [records, setRecords] = useState(data.records)

  useEffect(() => {
    api
      .create({
        id: 2,
        name: "Papa",
        startDate: "23",
        endDate: "26",
        didLike: "Si",
        days: "3",
        comment: "Le gustó demasiado"
      })
      .then(res => {
        setRecords(r => [...r, res.data])
      })
    // api.readAll().then(res => {
    //   console.log("RES", res)
    // })
  }, [])

  return (
    <div className='App container mx-auto'>
      <main>
        <div className='w-full mx-auto'>
          <div className='bg-white shadow-md rounded my-6'>
            <table className='text-left w-full border-collapse'>
              <thead>
                <tr>
                  <th className='py-4 px-6 bg-gray-200 font-bold uppercase text-xs text-gray-700 border-b border-r border-gray-400'>
                    Nombre de la comida
                  </th>
                  <th className='py-4 px-6 bg-gray-200 font-bold uppercase text-xs text-gray-700 border-b border-r border-gray-400'>
                    Día de inicio
                  </th>
                  <th className='py-4 px-6 bg-gray-200 font-bold uppercase text-xs text-gray-700 border-b border-r border-gray-400'>
                    Día que terminó
                  </th>
                  <th className='py-4 px-6 bg-gray-200 font-bold uppercase text-xs text-gray-700 border-b border-r border-gray-400'>
                    ¿Le gustó?
                  </th>
                  <th className='py-4 px-6 bg-gray-200 font-bold uppercase text-xs text-gray-700 border-b border-r border-gray-400'>
                    ¿Cúantos días?
                  </th>
                  <th className='py-4 px-6 bg-gray-200 font-bold uppercase text-xs text-gray-700 border-b border-r border-gray-400'>
                    Comentarios
                  </th>
                  <th className='py-4 px-6 bg-gray-200 font-bold uppercase text-xs text-gray-700 border-b border-gray-400'>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, idx) => (
                  <tr key={idx} className='hover:bg-gray-100'>
                    <td className='py-4 px-6 text-sm border-b border-r border-gray-light'>{record.name}</td>
                    <td className='py-4 px-6 text-sm border-b border-r border-gray-light'>{record.startDate}</td>
                    <td className='py-4 px-6 text-sm border-b border-r border-gray-light'>{record.endDate}</td>
                    <td className='py-4 px-6 text-sm border-b border-r border-gray-light'>{record.didLike}</td>
                    <td className='py-4 px-6 text-sm border-b border-r border-gray-light'>{record.days}</td>
                    <td className='py-4 px-6 text-sm border-b border-r border-gray-light'>{record.comment}</td>
                    <td className='py-4 px-6 text-sm border-b border-gray-light'>
                      <button className='w-full text-center font-bold py-1 px-3 rounded text-xs bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white focus:outline-none'>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Form goes here */}
        <form className='w-full my-10'>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3 mb-6 md:mb-0'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left'
                htmlFor='grid-food-name'
              >
                Nombre de la comida
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                id='grid-food-name'
                type='text'
                placeholder='Jane'
              />
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left'
                htmlFor='grid-start-date'
              >
                Fecha de inicio
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-start-date'
                type='text'
                placeholder='Albuquerque'
              />
            </div>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left'
                htmlFor='grid-end-date'
              >
                Fecha de termino
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-end-date'
                type='text'
                placeholder='90210'
              />
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-2'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left'
                htmlFor='grid-days'
              >
                ¿Cúantos días?
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-days'
                type='text'
                placeholder='Albuquerque'
              />
            </div>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left'
                htmlFor='grid-like'
              >
                ¿Le gustó?
              </label>
              <div className='relative'>
                <select
                  className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-like'
                >
                  <option>Sí</option>
                  <option>No</option>
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                  <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                    <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                  </svg>
                </div>
              </div>
            </div>
            <div className='w-full px-3 my-6 md:mb-0'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left'
                htmlFor='grid-comments'
              >
                Comentarios
              </label>
              <textarea
                rows='6'
                className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                id='grid-comments'
                placeholder='Jane'
              />
            </div>
          </div>
          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white focus:outline-none my-1'
          >
            Agregar nueva comida
          </button>
        </form>
      </main>
    </div>
  )
}

export default App
