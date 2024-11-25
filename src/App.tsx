import React, { useEffect, useState } from "react";
import { fetchLiturgiaDiaria, Liturgia } from "./utils/api";

const App: React.FC = () => {
  const [liturgia, setLiturgia] = useState<Liturgia | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadLiturgia = async () => {
      try {
        // Carrega os dados da API
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
    <div className="flex flex-col p-[30px] pb-[50px] bg-[#A9A9A9]">
      <p className="flex py-[40px] justify-center">Liturgia do Dia</p>
      {loading ? (
        <p>Carregando...</p>
      ) : liturgia ? (
        <div className="flex flex-col bg-[#87CEEB] justify-center items-center mx-auto">
          <div className="flex flex-col justify-center items-center">
            {/* Dados principais */}
            <div className="flex flex-col justify-center p-[30px] w-[1000px]">
              <p className="flex pb-[20px] justify-center">{liturgia.data}</p>
              <p className="pb-[10px]">Liturgia: {liturgia.liturgia}</p>
              <p className="pb-[10px]">Cor Litúrgica: {liturgia.cor}</p>
              <p>Oração do Dia: {liturgia.dia}</p>
            </div>

            {/* Primeira Leitura */}
            <div className="flex flex-col justify-center px-[300px] pt-[50px] w-[1000px]">
              <p className="flex pb-[20px] justify-center">Primeira Leitura</p>
              <p className="pb-[10px]">{liturgia.primeiraLeitura.referencia}</p>
              <p className="pb-[10px]">{liturgia.primeiraLeitura.titulo}</p>
              <p>{liturgia.primeiraLeitura.texto}</p>
            </div>

            {/* Segunda Leitura */}
            <div className="flex flex-col justify-center px-[300px] pt-[50px] w-[1000px]">
              {typeof liturgia.segundaLeitura === "string" ? (
                <p className="flex justify-center">
                  Segunda Leitura: {liturgia.segundaLeitura}
                </p>
              ) : (
                <>
                  <p className="flex justify-center">Segunda Leitura</p>
                  <p>{liturgia.segundaLeitura.referencia}</p>
                  <p>{liturgia.segundaLeitura.titulo}</p>
                  <p>{liturgia.segundaLeitura.texto}</p>
                </>
              )}
            </div>

            {/* Salmo */}
            <div className="flex flex-col justify-center px-[300px] pt-[50px] w-[1000px]">
              <p className="flex pb-[20px] justify-center">Salmo</p>
              <p className="pb-[10px]">{liturgia.salmo.referencia}</p>
              <p className="pb-[10px]">Refrão: {liturgia.salmo.refrao}</p>
              <p>{liturgia.salmo.texto}</p>
            </div>

            {/* Evangelho */}
            <div className="flex flex-col justify-center px-[300px] pt-[50px] w-[1000px] pb-[50px]">
              <p className="flex pb-[20px] justify-center">Evangelho</p>
              <p className="pb-[10px]">{liturgia.evangelho.referencia}</p>
              <p className="pb-[10px]">{liturgia.evangelho.titulo}</p>
              <p>{liturgia.evangelho.texto}</p>
            </div>

          </div>
        </div>
      ) : (
        <p>Não foi possível carregar os dados.</p>
      )}
    </div>
  );
};

export default App;