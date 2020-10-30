import 'axios' from axios;
import { apiUrl } from '../config';
import { Receita } from '../model/Receita';

export default class Pesquisa {
  constructor(query) {
    this.query = query;
  }

  async getResultado() {
    const res = await axios.post(`${apiUrl}/receitas`);
    return res.data;
  }
}