import { useState } from 'react';
import { CgClose } from 'react-icons/cg';

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
      className={`absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-5 ${
        isActive || confirm ? '' : 'hidden'
      }`}
    >
      {/* Modal de Itens */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full px-4 py-10 rounded relative ${
          !confirm ? '' : 'hidden'
        }`}
      >
        <span
          onClick={() => setIsActive(false)}
          className="font-bold text-2xl absolute top-3 right-3"
        >
          <CgClose />
        </span>

        <p className="font-bold">Itens:</p>
        {totalItens.length === 0
          ? 'Nenhum item selecionado'
          : totalItens.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-1"
              >
                <p>{item.nome} x{item.quantidade || 1}</p>
                <span>
                  R$ {(item.preco * (item.quantidade || 1))
                    .toFixed(2)
                    .replace('.', ',')}
                </span>
              </div>
            ))}

        <div className="mt-10 flex items-center justify-between">
          <p className="font-bold">Total:</p>
          <span className="text-red-500 font-bold">
            R$ {totalPrecos.toFixed(2).replace('.', ',')}
          </span>
        </div>

        <button
          onClick={() => setConfirm(true)}
          className="bg-green-500 font-bold text-white w-full px-4 py-2 rounded mt-5"
        >
          Finalizar pedido
        </button>
      </div>

      {/* Modal de Formulário */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full px-4 py-10 rounded relative ${
          confirm ? '' : 'hidden'
        }`}
      >
        <span
          onClick={() => setIsActive(false)}
          className="font-bold text-2xl absolute top-3 right-3"
        >
          <CgClose />
        </span>

        <p className="mb-3 font-bold">
          Está quase, preencha os seus dados:
        </p>

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
          className="bg-green-500 font-bold text-white w-full px-4 py-2 rounded mt-5"
        >
          Enviar pedido pelo WhatsApp
        </button>
      </div>
    </div>
  );
};

export default Buy;
