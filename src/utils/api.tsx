import axios from 'axios';

// Tipagem para os dados do Evangelho
export interface Evangelho {
  referencia: string;
  titulo: string;
  texto: string;
}

// Tipagem para os dados das leituras e salmos
export interface Leitura {
  referencia: string;
  titulo: string;
  texto: string;
}

// Tipagem para os dados completos da API
export interface Liturgia {
  data: string;
  liturgia: string;
  cor: string;
  dia: string;
  oferendas: string;
  comunhao: string;
  primeiraLeitura: Leitura;
  segundaLeitura: Leitura | string; // Pode ser uma string indicando "Não há segunda leitura hoje!"
  salmo: {
    referencia: string;
    refrao: string;
    texto: string;
  };
  evangelho: Evangelho;
  antifonas: {
    entrada: string;
    ofertorio: string;
    comunhao: string;
  };
}


// Função para buscar os dados da API Liturgia Diária
export const fetchLiturgiaDiaria = async (): Promise<Liturgia> => {
  try {
    const response = await axios.get('https://liturgia.up.railway.app/');
    return response.data; // Retorna os dados da API tipados
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw error; // Propaga o erro para o chamador
  }
};
