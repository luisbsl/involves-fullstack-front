import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const AlertaCard = (props) => {

  const filtraLabelEValorPeloFlTipo = (alerta) => {
    return [1, 2, 3].indexOf(alerta.flTipo) > -1 ? exibeLabelEValor('Produto', alerta.produto) : exibeLabelEValor('Categoria', alerta.categoria)
  }

  const exibeLabelEValor = (label, valor) => (
    <Typography component="p">
      <LabelBold>{label}:</LabelBold> {valor}
    </Typography>
  )

  const { alerta } = props
  return (
    <AlertaCardContainer>
      <AlertaCardHeader title={alerta.descricao} />
      <CardContent>
        <Typography component="p">
          <LabelBold>Local:</LabelBold> {alerta.pontoDeVenda}
        </Typography>

        {filtraLabelEValorPeloFlTipo(alerta)}

        {alerta.flTipo !== 1 ?
          <Typography component="p">
            <LabelBold>Margem:</LabelBold> {alerta.margem}
          </Typography>
          : null}
      </CardContent>
    </AlertaCardContainer>
  )
}

const AlertaCardContainer = styled(Card)`
  && {
    width: 300px; 
    height: 200px;
    margin: 10px;
  }
`

const AlertaCardHeader = styled(CardHeader)`
  && {
    background-color: #ccc;
    height: 65px;
  }
`

const LabelBold = styled.span`
  font-weight: bold;
`

AlertaCard.propTypes = {
  alerta: PropTypes.object.isRequired
};

export default AlertaCard