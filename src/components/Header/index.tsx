// import React from "react";

// const Header: React.FC = () => {
//   const FormatarData = ({ dataString }: { dataString: string }, liturgia) => {
//     // Divida a data no formato DD/MM/AAAA
//     const [dia, mes, ano] = dataString.split("/");

//     // Lista de meses por extenso
//     const meses = [
//       "Janeiro",
//       "Fevereiro",
//       "Março",
//       "Abril",
//       "Maio",
//       "Junho",
//       "Julho",
//       "Agosto",
//       "Setembro",
//       "Outubro",
//       "Novembro",
//       "Dezembro",
//     ];

//     return `${dia} de ${meses[parseInt(mes) - 1]} de ${ano}`;
//   };
//   return (
//     <div className="flex flex-col justify-center p-4 w-full">
//       <p className="text-center text-lg font-bold mb-4">
//         {FormatarData({ dataString: liturgia.data })}
//       </p>
//       <p className="flex justify-center text-base mb-2">
//         Cor Litúrgica: {liturgia.cor}
//       </p>
//       <p className="text-base mb-2">{liturgia.liturgia} | </p>
//       <p className="text-base">Oração do Dia: {liturgia.dia}</p>
//     </div>
//   );
// };

// export default Header;


// continuar dps