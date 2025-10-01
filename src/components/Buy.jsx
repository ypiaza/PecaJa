import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import Header from './Header';

const Buy = ({ totalItens, totalPrecos, isActive, setIsActive }) => {
  const [confirm, setConfirm] = useState(false);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [obs, setObs] = useState('');

  const enviarWhatsApp = () => {
    if (!nome || !telefone || !endereco) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    let mensagem = `Olá, gostaria de fazer o pedido:\n\n`;

    totalItens.forEach((item) => {
      mensagem += `${item.nome} x${item.quantidade || 1} - R$ ${(
        item.preco * (item.quantidade || 1)
      ).toFixed(2)}\n`;
    });

    mensagem += `\nTotal: R$ ${totalPrecos.toFixed(2)}\n`;
    mensagem += `\nNome: ${nome}\nTelefone: ${telefone}\nEndereço: ${endereco}\nObservações: ${obs}`;

    const numeroRestaurante = '5579998671726'; // Coloque o número do restaurante
    const url = `https://wa.me/${numeroRestaurante}?text=${encodeURIComponent(
      mensagem
    )}`;

    window.open(url, '_blank');
    setIsActive(false);
    setConfirm(false);
  };

  return (
    <div
      onClick={() => setIsActive(false)}
      className={`absolute inset-0 flex items-center justify-center pt-15 ${isActive || confirm ? '' : 'hidden'
        }`}
    >
      {/* Modal de Itens */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white h-full w-full rounded-t-2xl relative grid grid-cols-1 grid-rows-2 ${!confirm ? '' : 'hidden'
          }`}
      >
        <span
          onClick={() => setIsActive(false)}
          className="font-bold text-3xl absolute top-6 right-6"
        >
          <CgClose />
        </span>

        <div className='flex flex-col items-start justify-evenly w-full p-10'>
          <p className="font-bold text-2xl">Pedido:</p>
          {totalItens.length === 0
            ? 'Nenhum item selecionado'
            : totalItens.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between w-full mb-1"
              >
                <p className='font-bold text-xl'>{item.quantidade || 1} x {item.name}</p>
                <span className='font-bold text-xl'>
                  R$ {(item.price * (item.quantidade || 1))
                    .toFixed(2)
                    .replace('.', ',')}
                </span>
              </div>
            ))}

          <div className="mt-10 flex items-center w-full justify-between">
            <p className="font-bold text-xl">Total:</p>
            <span className="text-red-500 font-bold text-xl">
              R$ {totalPrecos.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

        {/*Dados do pedido*/}
        <div className='p-10'>
          <h2 className='font-bold text-2xl mb-8'>Dados do Pedido</h2>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border px-3 py-2 rounded"
              required
            />
            <input
              type="tel"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="border px-3 py-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="border px-3 py-2 rounded"
              required
            />
            <textarea
              placeholder="Observações (opcional)"
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              className="border px-3 py-2 rounded"
            />
          </form>

          <button
            onClick={enviarWhatsApp}
            className="bg-green-500 font-bold text-white w-full px-4 py-4 rounded mt-5"
          >
            Enviar pedido pelo WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Buy;
