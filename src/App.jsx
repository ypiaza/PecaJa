import React, { useState } from 'react';
import Header from './components/Header';
import { produtos } from './data/produtos';
import Footer from './components/Footer';
import Buy from './components/Buy';

const App = () => {
  const [carrinho, setCarrinho] = useState([]);
  const [isActive, setIsActive] = useState(false);

  // Retorna a quantidade de um produto no carrinho
  const getQuantidade = (id) => {
    const produto = carrinho.find((item) => item.id === id);
    return produto ? produto.quantidade : 0;
  };

  // Adiciona/incrementa produto
  const adicionarAoCarrinho = (item) => {
    setCarrinho((prevCarrinho) => {
      const existe = prevCarrinho.find((p) => p.id === item.id);
      if (existe) {
        return prevCarrinho.map((p) =>
          p.id === item.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      }
      return [...prevCarrinho, { ...item, quantidade: 1 }];
    });
  };

  // Remove/decrementa produto
  const removerDoCarrinho = (item) => {
    setCarrinho((prevCarrinho) => {
      const existe = prevCarrinho.find((p) => p.id === item.id);
      if (existe && existe.quantidade > 1) {
        return prevCarrinho.map((p) =>
          p.id === item.id ? { ...p, quantidade: p.quantidade - 1 } : p
        );
      }
      // Se quantidade for 1, remove do carrinho
      return prevCarrinho.filter((p) => p.id !== item.id);
    });
  };

  // Total de itens considerando a quantidade de cada produto
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  // Total de preço considerando a quantidade de cada produto
  const totalPreco = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <div className='relative flex flex-col h-screen items-center justify-center bg-yellow-400'>
      <Header />

      <div className='grid grid-cols-2 place-items-center gap-1 overflow-scroll mt-15 mb-15 w-full p-2'>
        {produtos.map((item) => (
          <div key={item.id} className='flex flex-col bg-white h-full w-full items-center justify-between border border-white/10 rounded p-3'>
            <img className='w-[8rem] h-[8rem] bg-center bg-cover' src={item.imagem} />

            <div className='flex flex-col items-center justify-center'>
              <p className='font-bold'>{item.nome}</p>
              <span className='text-[0.7rem]'>{item.descricao}</span>
            </div>

            <div className='flex w-full justify-between items-center'>
              <p className='font-semibold'>
                R$ {item.preco % 2 === 0 ? `${item.preco},00` : `${item.preco}0`}
              </p>

              <button 
                onClick={() => removerDoCarrinho(item)} 
                className='flex items-center justify-center rounded bg-black px-3.5 py-1 text-white font-bold'
              >
                -
              </button>

              <p>{getQuantidade(item.id)}</p>

              <button 
                onClick={() => adicionarAoCarrinho(item)} 
                className='flex items-center justify-center rounded bg-black px-3 py-1 text-white font-bold'
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <Footer totalItens={totalItens} totalPrecos={totalPreco} setIsActive={setIsActive} />
      <Buy totalItens={carrinho} totalPrecos={totalPreco} isActive={isActive} setIsActive={setIsActive} />
    </div>
  );
};

export default App;
