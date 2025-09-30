import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { supabase } from './supabaseClient';
import Footer from './components/Footer';
import Buy from './components/Buy';

const App = () => {
  const [produtos, setProdutos] = useState([]);
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

  //Carregar produtos do banco de dados
  useEffect(() => {
    fetchProdutos();
  }, []);

  async function fetchProdutos() {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.log("Erro ao carregar produtos", error);
    } else {
      setProdutos(data);
    }
  }


  // Total de itens considerando a quantidade de cada produto
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  // Total de preço considerando a quantidade de cada produto
  const totalPreco = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <div className='relative flex flex-col h-screen items-center justify-center bg-black'>
      <Header />

      <div className='grid grid-cols-2 place-items-center gap-2 overflow-scroll mt-15 mb-15 w-full p-2'>
        {produtos.map((item) => (
          <div key={item.id} className='flex flex-col bg-white h-full w-full items-center justify-between border border-white/10 rounded-2xl p-3'>
            <img className='w-[8rem] h-[6rem] mb-3 rounded-2xl bg-center bg-cover' src={item.image_url} />

            <div className='flex flex-col items-center mb-3 justify-center'>
              <p className='font-bold text-center'>{item.name}</p>
              {/* <span className='text-[0.7rem]'>{item.descricao}</span> */}
            </div>

            <div className='flex w-full justify-between items-center'>
              <p className='font-semibold'>
                R$ {item.price % 2 === 0 ? `${item.price},00` : `${item.price}0`}
              </p>

              <button
                onClick={() => removerDoCarrinho(item)}
                className='flex items-center justify-center rounded bg-red-500 px-3.5 py-1 text-white font-bold'
              >
                -
              </button>

              <p>{getQuantidade(item.id)}</p>

              <button
                onClick={() => adicionarAoCarrinho(item)}
                className='flex items-center justify-center rounded bg-green-500 px-3 py-1 text-white font-bold'
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
