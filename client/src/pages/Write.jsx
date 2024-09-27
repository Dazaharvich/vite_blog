import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from "@/components/ui/input";


const Write = () => {

  const [value, setValue] = useState('');

  return (
     <div className="add-- flex px-4 py-8 gap-14 mx-10"> 
      <div className="content-- lg:flex-5  w-full">
        {/* Input Text */}
      <Input type="text" placeholder="Titulo del Caso" className="max-w-fit mt-4 mb-4 rounded-lg px-4 py-4 hover:cursor-pointer"/>
        {/* Rich Text Editor */}
        <div className='mt-10 overflow-scroll'>
        <ReactQuill className='h-96 border-none' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
        {/* Create Menú */}
        <div className="menu flex-2 flex flex-col">
          <div className="item">
            <h3>Publicar</h3>
            <span>
              <b>Status: </b> Borrador
            </span>
            <span>
              <b>Visibilidad: </b> Publicado
            </span>
            <input className='hidden' type="file" name='' id='file' />
            <label className='hover:cursor-pointer' htmlFor="file">Subir Imagen</label>
            {/* Buttons */}
            <div>
              <button>Guardar como Borrador</button>
              <button>Actualizar</button>
            </div>
          </div>
          <div className="item flex gap-5">
            <h3>Categoría</h3>
            <input className='p-2' type="radio" name='categoty' value="vps" id='vps'/>
            <label htmlFor="vps">VPS</label>
            <input type="radio" name='categoty' value="correos" id='correos'/>
            <label htmlFor="correos">Correos</label>
            <input type="radio" name='categoty' value="wordpress" id='wordpress'/>
            <label htmlFor="wordpress">Wordpress</label>
            <input type="radio" name='categoty' value="Web" id='Web'/>
            <label htmlFor="Web">Web</label>
          </div>
        </div>
      </div>
  )
}

export default Write