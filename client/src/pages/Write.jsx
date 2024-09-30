import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from "@/components/ui/input";

const Write = () => {
  const [value, setValue] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-14">
        {/* Content */}
        <div className="content w-full lg:flex-5">
          {/* Input Text */}
          <Input 
            type="text" 
            placeholder="Titulo del Caso" 
            className="w-full rounded-lg px-4 py-3 mb-4 border border-gray-300 focus:border-blue-500 focus:outline-none" 
          />
          {/* Rich Text Editor */}
          <div className="mt-6">
            <ReactQuill 
              className="h-96 border rounded-lg" 
              theme="snow" 
              value={value} 
              onChange={setValue} 
            />
          </div>
        </div>

        {/* Create Menu */}
        <div className="menu w-1/5 lg:flex-2 flex flex-col gap-6">
          {/* Publicar Options */}
          <div className="item bg-slate-900 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">Publicar</h3>
            <span className="block mb-2">
              <b>Status: </b> Borrador
            </span>
            <span className="block mb-4">
              <b>Visibilidad: </b> Publicado
            </span>
            <input className="hidden" type="file" name="" id="file" />
            <label htmlFor="file" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Subir Imagen</label>
            {/* Buttons */}
            <div className="mt-14 gap-4 flex flex-col">
              <button className="bg-blue-500 px-4 py-2 rounded-md hover:bg-gray-400 transition">Guardar Borrador</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Actualizar</button>
            </div>
          </div>

          {/* Categoría Options */}
          <div className="item bg-slate-900 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">Categoría</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <input className="cursor-pointer" type="radio" name="category" value="vps" id="vps" />
                <label htmlFor="vps" className="cursor-pointer">VPS</label>
              </div>
              <div className="flex items-center gap-2">
                <input className="cursor-pointer" type="radio" name="category" value="correos" id="correos" />
                <label htmlFor="correos" className="cursor-pointer">Correos</label>
              </div>
              <div className="flex items-center gap-2">
                <input className="cursor-pointer" type="radio" name="category" value="wordpress" id="wordpress" />
                <label htmlFor="wordpress" className="cursor-pointer">Wordpress</label>
              </div>
              <div className="flex items-center gap-2">
                <input className="cursor-pointer" type="radio" name="category" value="Web" id="Web" />
                <label htmlFor="Web" className="cursor-pointer">Web</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
