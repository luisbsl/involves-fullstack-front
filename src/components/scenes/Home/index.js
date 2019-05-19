import React from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

import AlertaService from 'services/AlertaService/index'
import AlertaFiltro from './components/AlertaFiltro'
import AlertaCard from './components/AlertaCard'
import Loading from './components/Loading'
import ErrorDialog from './components/ErroDialog'

const FLTIPO_RUPTURA = 1;
const FLTIPO_PRECO_ACIMA = 2;
const FLTIPO_PRECO_ABAIXO = 3;
const FLTIPO_PARTICIPACAO_ACIMA = 4;
const FLTIPO_PARTICIPACAO_ABAIXO = 5;

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      alertas: [],
      alertasFiltradosPorTipo: [],
      existeAlertas: false,
      filtroTipoDeAlertaSelecionado: 'todos',
      textoBuscaPontoDeVenda: '',
      pontoDeVendaNaoEntrado: false,
      mostrarErroDeConexaoDialog: false
    }
  }

  componentDidMount = async () => {
    await AlertaService.buscarAlertas().then(alertas => {
      if (alertas.length < 1) {
        this.setState({ mostrarErroDeConexaoDialog: true })
      }
      let _alertasOrdenadosPorTipo = alertas.sort((objA, objB) => { return objB.flTipo < objA.flTipo })
      this.setState({
        alertas: _alertasOrdenadosPorTipo,
        alertasFiltradosPorTipo: _alertasOrdenadosPorTipo,
        existeAlertas: true,
      })
    }).catch(error => {
      this.setState({ mostrarErroDeConexaoDialog: true })
    })
  }

  filtrarAlertasPorFlTipo = (alertas, flTipo) => {
    let alertasFiltrados =
      alertas.filter(alerta => {
        return flTipo.includes(alerta.flTipo)
      })
    return alertasFiltrados
  }

  exibirAletasCards = () => (
    <AlertaCardContainer>
      {this.state.alertasFiltradosPorTipo.map((alerta, index) => <AlertaCard
        key={index}
        alerta={alerta}
      />)}
    </AlertaCardContainer>
  )

  handleChangeFiltroRadioPontoDeVenda = event => {
    const filtroTipoAlerta = event.target.value
    this.setState({ filtroTipoDeAlertaSelecionado: filtroTipoAlerta })
    this.gerarAlertasFiltradosPorFiltroRadio(filtroTipoAlerta)
  }

  gerarAlertasFiltradosPorFiltroRadio = filtroTipoAlerta => {
    switch (filtroTipoAlerta) {
      case 'ruptura':
        this.setState({ alertasFiltradosPorTipo: this.filtrarAlertasPorFlTipo(this.state.alertas, [FLTIPO_RUPTURA]) })
        break;
      case 'preco':
        this.setState({ alertasFiltradosPorTipo: this.filtrarAlertasPorFlTipo(this.state.alertas, [FLTIPO_PRECO_ACIMA, FLTIPO_PRECO_ABAIXO]) })
        break;
      case 'participacao':
        this.setState({ alertasFiltradosPorTipo: this.filtrarAlertasPorFlTipo(this.state.alertas, [FLTIPO_PARTICIPACAO_ACIMA, FLTIPO_PARTICIPACAO_ABAIXO]) })
        break;
      default:
        this.setState({ alertasFiltradosPorTipo: this.state.alertas })
        break;
    }
  }

  handleChangeFiltroPontoDeVendaSearchTitle = (event) => {
    this.setState({ pontoDeVendaNaoEntrado: false })
    const textoBuscaPontoDeVenda = event.target.value.toUpperCase()
    this.setState({ textoBuscaPontoDeVenda: textoBuscaPontoDeVenda })

    if (textoBuscaPontoDeVenda.length > 0) {
      let alertasFiltradosPorPontoDeVenda = this.state.alertas;

      alertasFiltradosPorPontoDeVenda = alertasFiltradosPorPontoDeVenda.filter(alerta => {
        return alerta.pontoDeVenda.toUpperCase().search(
          textoBuscaPontoDeVenda) !== -1;
      });

      this.setState({ alertasFiltradosPorTipo: alertasFiltradosPorPontoDeVenda })

      if (alertasFiltradosPorPontoDeVenda.length < 1) {
        this.setState({ pontoDeVendaNaoEntrado: true })
      }
    } else {
      this.gerarAlertasFiltradosPorFiltroRadio(this.state.filtroTipoDeAlertaSelecionado)
    }
  }

  handleFecharErroDialog = () => {
    this.setState({ mostrarErroDeConexaoDialog: false })
  }

  render() {
    return (
      <HomeContainer>
        <HeaderContainer>
          <Typography component="h2" variant="h3" style={{ paddingTop: 20 }} >
            Central de Alertas
          </Typography>
        </HeaderContainer>

        <AlertaFiltro
          onChangeFiltroPontoDeVenda={this.handleChangeFiltroPontoDeVendaSearchTitle.bind(this)}
          onChangeFiltroTipoAlerta={this.handleChangeFiltroRadioPontoDeVenda.bind(this)}
          filtroTipoAlerta={this.state.filtroTipoDeAlertaSelecionado} />

        {this.state.existeAlertas ? this.exibirAletasCards() : <Loading />}

        {this.state.pontoDeVendaNaoEntrado ?
          <TextoPontoDeVendaNaoEncontradoStyled component='p' align='center'>
            Ponto de venda não encontrado
          </TextoPontoDeVendaNaoEncontradoStyled>
          : null}

        <ErrorDialog open={this.state.mostrarErroDeConexaoDialog}
          onClose={this.handleFecharErroDialog}
          aria-describedby="alert-dialog-description" />
      </HomeContainer>
    )
  }
}

const HomeContainer = styled.div`
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100%;
  background-color: #F2F2F2;
`

const AlertaCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`

const HeaderContainer = styled.header`
  height: 100px;
  justify-content: center; 
  text-align: center;
  align-content: center;
  align-items: center;
`

const TextoPontoDeVendaNaoEncontradoStyled = styled(Typography)`
  && {
    font-size: 18px;
    color: #F50057;
  }
`