export default function FormatarData({ dataString }: { dataString: string }) {
    // Divida a data no formato DD/MM/AAAA
    const [dia, mes, ano] = dataString.split('/');
  
    // Lista de meses por extenso
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril',
      'Maio', 'Junho', 'Julho', 'Agosto',
      'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
  
    return `${dia} de ${meses[parseInt(mes) - 1]} de ${ano}`;
  }