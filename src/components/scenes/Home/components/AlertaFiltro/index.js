import React from 'react'
import Paper from '@material-ui/core/Paper'
import Radio from '@material-ui/core/Radio'
import InputBase from '@material-ui/core/InputBase'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const AlertaFiltro = (props) => {
  const { onChangeFiltroPontoDeVenda, onChangeFiltroTipoAlerta, filtroTipoAlerta } = props
  return (
    <AlertaFiltroContainer elevation={1}>
      <Centralizador>
        <StyledInput
          placeholder="Ponto de venda"
          onChange={onChangeFiltroPontoDeVenda} />
      </Centralizador>

      <Centralizador>
        <div>
          <Radio
            checked={filtroTipoAlerta === 'todos'}
            onChange={onChangeFiltroTipoAlerta}
            value="todos"
            name="radio-tipo-alerta"
            aria-label="TODOS"
          />
          Todos
          </div>
        <div>
          <Radio
            checked={filtroTipoAlerta === 'ruptura'}
            onChange={onChangeFiltroTipoAlerta}
            value="ruptura"
            name="radio-tipo-alerta"
            aria-label="RUPTURA"
          />
          Ruptura
          </div>
        <div>
          <Radio
            checked={filtroTipoAlerta === 'preco'}
            onChange={onChangeFiltroTipoAlerta}
            value="preco"
            name="radio-tipo-alerta"
            aria-label="PRECO"
          />
          Preço
          </div>
        <div>
          <Radio
            checked={filtroTipoAlerta === 'participacao'}
            onChange={onChangeFiltroTipoAlerta}
            value="participacao"
            name="radio-tipo-alerta"
            aria-label="PARTICIPACAO"
          />
          Participação
          </div>
      </Centralizador>
    </AlertaFiltroContainer>
  )
}

const AlertaFiltroContainer = styled(Paper)`
  && {
    margin: 10px; 
    padding: 20px 0 20px 0;
  }
`

const Centralizador = styled.div`
  margin: 0 auto; 
  display: flex; 
  flex-direction: row; 
  justify-content: center;
`

const StyledInput = styled(InputBase)`
  && {
    padding-left: 10px;
    width: 50%;
    color: #000;
    background-color: #f2f2f2;
    padding-left: 8;
  }
`

AlertaFiltro.propTypes = {
  onChangeFiltroPontoDeVenda: PropTypes.func.isRequired,
  onChangeFiltroTipoAlerta: PropTypes.func.isRequired,
  filtroTipoAlerta: PropTypes.string
}

export default AlertaFiltro