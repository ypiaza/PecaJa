import { CgClose } from 'react-icons/cg'

const Buy = ({ totalItens, totalPrecos, isActive, setIsActive}) => {

    return (
        <div onClick={() => setIsActive(false)} className={`absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-5 ${isActive === true ? `` : `hidden`}`}>
            <div className='bg-white w-full px-4 py-10 rounded relative'>
                <span onClick={() => setIsActive(false)} className='font-bold text-2xl absolute top-3 right-3'><CgClose /></span>

                <p className='font-bold'>Itens:</p>
                {totalItens.length === 0 ? `Nenhum item selecionado` : (

                    totalItens.map((item) => (
                        <div className='flex items-center justify-between'>
                            <p>{item.nome}</p>
                            <span>R$ {item.preco.toFixed(2).replace('.', ',')}</span>
                        </div>
                    ))
                )}

                <div className='mt-10 flex items-center justify-between'>
                    <p className='font-bold'>Total:</p>
                    <span className='text-red-500 font-bold'>R$ {totalPrecos.toFixed(2).replace('.', ',')}</span>
                </div>
                <button className='bg-green-500 font-bold text-white w-full px-4 py-2 rounded mt-5'>Finalizar pedido</button>
            </div>
        </div>
    )
}

export default Buy
