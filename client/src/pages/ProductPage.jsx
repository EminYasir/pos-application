import Headerr from '../components/header/Headerr'
import Edit from '../components/products/Edit'

const ProductPage = () => {
    
  return (
    <div>
        <Headerr/>
        <div className='px-6'>
            <h1 className='text-4xl font-bold text-center mb-4'>Ürünler</h1>
            <Edit />
        </div>
    </div>
  )
}

export default ProductPage