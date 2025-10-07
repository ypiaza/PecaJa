import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { supabase } from "../supabaseClient";

const Buy = ({ totalItens, totalPrecos, isActive, setIsActive }) => {
  const [confirm, setConfirm] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [obs, setObs] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarPedido = async () => {
    if (!nome || !telefone || !endereco) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    setLoading(true);

    // Monta o pedido para salvar no banco
    const pedido = {
      items: totalItens.map((i) => ({
        name: i.name,
        price: i.price,
        quantidade: i.quantidade,
      })),
      total: totalPrecos,
      customer_name: nome,
      customer_phone: telefone,
      customer_address: endereco,
      obs: obs,
      status: "pendente",
    };

    // 1️⃣ Salva no banco Supabase
    const { error } = await supabase.from("orders").insert([pedido]);
    if (error) {
      console.error("Erro ao salvar pedido:", error.message);
      alert("Erro ao enviar pedido, tente novamente.");
      setLoading(false);
      return;
    }

    // 2️⃣ Monta mensagem para WhatsApp
    let mensagem = `Olá, gostaria de fazer o pedido:\n\n`;
    totalItens.forEach((item) => {
      mensagem += `${item.name} x${item.quantidade || 1} - R$ ${(
        item.preco * (item.quantidade || 1)
      ).toFixed(2)}\n`;
    });
    mensagem += `\n💰 Total: R$ ${totalPrecos.toFixed(2)}\n`;
    mensagem += `\n👤 Nome: ${nome}\n📞 Telefone: ${telefone}\n📍 Endereço: ${endereco}\n📝 Observações: ${obs}`;

    const numeroRestaurante = "5579998671726"; // número fixo do restaurante
    const url = `https://wa.me/${numeroRestaurante}?text=${encodeURIComponent(
      mensagem
    )}`;

    // 3️⃣ Abre WhatsApp e fecha modal
    window.open(url, "_blank");
    setIsActive(false);
    setConfirm(false);
    setLoading(false);
  };

  return (
    <div
      onClick={() => setIsActive(false)}
      className={`absolute inset-0 flex items-center justify-center pt-15 ${
        isActive || confirm ? "" : "hidden"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white h-full w-full rounded-t-2xl relative grid grid-cols-1 grid-rows-2 ${
          !confirm ? "" : "hidden"
        }`}
      >
        <span
          onClick={() => setIsActive(false)}
          className="font-bold text-3xl absolute top-6 right-6"
        >
          <CgClose />
        </span>

        {/* Resumo do pedido */}
        <div className="flex flex-col items-start justify-evenly w-full p-10">
          <p className="font-bold text-2xl">Pedido:</p>
          {totalItens.length === 0
            ? "Nenhum item selecionado"
            : totalItens.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between w-full mb-1"
                >
                  <p className="font-bold text-xl">
                    {item.quantidade || 1}x {item.name}
                  </p>
                  <span className="font-bold text-xl">
                    R${" "}
                    {(item.price * (item.quantidade || 1))
                      .toFixed(2)
                      .replace(".", ",")}
                  </span>
                </div>
              ))}

          <div className="mt-10 flex items-center w-full justify-between">
            <p className="font-bold text-xl">Total:</p>
            <span className="text-red-500 font-bold text-xl">
              R$ {totalPrecos.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>

        {/* Dados do cliente */}
        <div className="p-10">
          <h2 className="font-bold text-2xl mb-8">Dados do Pedido</h2>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
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
            onClick={enviarPedido}
            disabled={loading}
            className={`w-full px-4 py-4 font-bold text-white rounded mt-5 ${
              loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Enviando..." : "Enviar pedido pelo WhatsApp"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Buy;
