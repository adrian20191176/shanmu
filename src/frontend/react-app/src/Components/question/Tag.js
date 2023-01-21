import 'bootstrap/dist/css/bootstrap.min.css';
import './Tag.scss'

const Tag = ({text, color}) => {
  return (
    <>
      <button className="btn btn-light px-3 my-2 me-3 border Medium-Body-sub-text-2" 
        style={{ paddingBlockEnd: 5, backgroundColor: color }}
      >{text}</button>
    </>
  )
}

export default Tag;