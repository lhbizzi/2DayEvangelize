import React, { useEffect, useState } from "react";
import { fetchLiturgiaDiaria, Liturgia } from "./utils/api";

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

  const Divider = () => (
    <div className="border-t-2 border-[#f2f2f2] my-4 w-full" />
  );

  const FormatarData = ({ dataString }: { dataString: string }) => {
    // Divida a data no formato DD/MM/AAAA
    const [dia, mes, ano] = dataString.split("/");

    // Lista de meses por extenso
    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    return `${dia} de ${meses[parseInt(mes) - 1]} de ${ano}`;
  };

  const now = new Date();
  const diaSemana = now.getDay();
  let diaSemanaTexto;

  switch (diaSemana) {
    case 0:
      diaSemanaTexto = "Domingo";
      break;
    case 1:
      diaSemanaTexto = "Segunda-Feira";
      break;
    case 2:
      diaSemanaTexto = "Terça-Feira";
      break;
    case 3:
      diaSemanaTexto = "Quarta-Feira";
      break;
    case 4:
      diaSemanaTexto = "Quinta-Feira";
      break;
    case 5:
      diaSemanaTexto = "Sexta-Feira";
      break;
    case 6:
      diaSemanaTexto = "Sábado";
      break;
  }

  const bgLiturgia = ({ cor }: { cor: string }) => {
    switch (cor) {
      case "Verde":
        return '#FFFAFA';
      case "Branco":
        return "#FFFAFA";
      case "Rosa":
        return "";
      default:
        return "gray-400";
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <p className="w-full py-6 bg-gray-400 text-center text-xl font-bold">
        Evangelho do Dia
      </p>
      {loading ? (
        <p className="text-lg mt-4">Carregando...</p>
      ) : liturgia ? (
        <div className="flex flex-col justify-center items-center w-full px-4 md:px-8 lg:px-16 xl:px-24 font-[600]"
        style={{ backgroundColor: bgLiturgia({ cor: liturgia.cor }) }}>
          <div className="flex flex-col w-full max-w-4xl">
            <div className="flex flex-col justify-center p-4 w-full">
              <p className="text-center text-lg font-bold mb-4">
                {FormatarData({ dataString: liturgia.data })}
              </p>
              <p className="flex justify-center text-base mb-2">
                Cor Litúrgica: {liturgia.cor}
              </p>
              <p className="flex justify-center text-base mb-2">
                {liturgia.liturgia} | {diaSemanaTexto}
              </p>
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
