import axios from 'axios'

const API_ALERTAS_URL = 'http://localhost:8080/api/v1/alertas'

const AlertaService = {
  buscarAlertas: async () => {
    let alertas = []
    await axios.get(API_ALERTAS_URL)
      .then(response => {
        alertas = response.data
      })
      .catch(error => {
        return error
      });
    return alertas
  }
}

export default AlertaService