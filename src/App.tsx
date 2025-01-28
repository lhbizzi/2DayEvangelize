import React, { useEffect, useState } from "react";
import { fetchLiturgiaDiaria, Liturgia } from "./utils/api";
import Divider from "./components/divider";
import FormatarData from "./components/formatData";

const App: React.FC = () => {
  const [liturgia, setLiturgia] = useState<Liturgia | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadLiturgia = async () => {
      try {
        const data = await fetchLiturgiaDiaria();
        setLiturgia(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados ou gerar imagem:", error);
        setLoading(false);
      }
    };

    loadLiturgia();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <p className="w-full py-6 bg-gray-400 text-center text-xl font-bold">
        Evangelho do Dia
      </p>
      {loading ? (
        <p className="text-lg mt-4">Carregando...</p>
      ) : liturgia ? (
        <div
          className="flex flex-col justify-center items-center w-full px-4 md:px-8 lg:px-16 xl:px-24"
          style={{
            backgroundColor: "#87CEEB", // Cor recebida da API ou valor padrão
          }}
        >
          <div className="flex flex-col w-full max-w-4xl">
            <div className="flex flex-col justify-center p-4 w-full">
              <p className="text-center text-lg font-bold mb-4">
                {FormatarData({ dataString: liturgia.data })}
              </p>
              <p className="text-base mb-2">Liturgia: {liturgia.liturgia}</p>
              <p className="text-base mb-2">Cor Litúrgica: {liturgia.cor}</p>
              <p className="text-base">Oração do Dia: {liturgia.dia}</p>
            </div>
            <Divider />
            {/* Primeira Leitura */}
            <div className="flex flex-col justify-center py-8">
              <p className="text-center text-lg font-bold mb-4">
                Primeira Leitura
              </p>
              <p className="text-base mb-2">
                {liturgia.primeiraLeitura.referencia}
              </p>
              <p className="text-base mb-2">
                {liturgia.primeiraLeitura.titulo}
              </p>
              <p className="text-base">{liturgia.primeiraLeitura.texto}</p>
            </div>
            <Divider />
            {/* Segunda Leitura */}
            <div className="flex flex-col justify-center py-8">
              <p className="text-center text-lg font-bold mb-4">
                Segunda Leitura
              </p>
              {typeof liturgia.segundaLeitura === "string" ? (
                <p className="text-center text-base">
                  {liturgia.segundaLeitura}
                </p>
              ) : (
                <>
                  <p className="text-base">
                    {liturgia.segundaLeitura.referencia}
                  </p>
                  <p className="text-base">{liturgia.segundaLeitura.titulo}</p>
                  <p className="text-base">{liturgia.segundaLeitura.texto}</p>
                </>
              )}
            </div>
            <Divider />
            {/* Salmo */}
            <div className="flex flex-col justify-center py-8">
              <p className="text-center text-lg font-bold mb-4">Salmo</p>
              <p className="text-base mb-2">{liturgia.salmo.referencia}</p>
              <p className="text-base mb-2">Refrão: {liturgia.salmo.refrao}</p>
              <p className="text-base">{liturgia.salmo.texto}</p>
            </div>
            <Divider />
            {/* Evangelho */}
            <div className="flex flex-col justify-center py-8">
              <p className="text-center text-lg font-bold mb-4">Evangelho</p>
              <p className="text-base mb-2">{liturgia.evangelho.referencia}</p>
              <p className="text-base mb-2">{liturgia.evangelho.titulo}</p>
              <p className="text-base">{liturgia.evangelho.texto}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-lg mt-4">Não foi possível carregar os dados.</p>
      )}
    </div>
  );
};

export default App;
