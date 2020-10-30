import 'axios' from axios;
import { apiUrl } from '../config';

export default class Receita {
  constructor() {
  }

  async createRecipe(data) {
    const res = await axios.post(`${apiUrl}/receitas`, data);
  }
  
  async getRecipe(id) {
    const res = await axios.get(`${apiUrl}/receitas/${id}`);
    this.titulo = res.data.titulo;
  }

  async updateRecipe(id, data) {
    const res = await axios.patch(`${apiUrl}/receitas/${id}`, data);
  }

  async deleteRecipe(id) {
    const res = await axios.delete(`${apiUrl}/receitas/$`)
  }
}