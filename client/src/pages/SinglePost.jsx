import Edit from "../public/img/icons8-editar-64.svg";
import Delete from "../public/img/icons8-borrar-para-siempre-64.png";

const SinglePost = () => {
  return (
    <div className='flex gap-12'>
      <div className='content-- '>
        <img className="w-full h-72 object-cover" src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm90byUyMGRlJTIwcGVyZmlsfGVufDB8fDB8fHww" alt="" />
        <div className='user-- flex items-center gap-3 text-sm'>
          <img className="w-12 h-12 rounded-full object-cover" src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Foto_Perfil_.jpg" alt="" />
          <div className="info-- ">
            <span  className='font-bold'>Jhon</span>
            <p>Creado hace 2 Días</p>
          </div>
          <div className='edit-- '>
            <img src={Edit} alt="" />
          </div>
        </div>
      </div>
      <div className='menu-- '>M</div>
    </div>
  )
}

export default SinglePost