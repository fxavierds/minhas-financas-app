import React from 'react';
import Card from '../components/cards';
import FormGroup from '../components/formgroup';

class Login extends React.Component{
  state = {
    email: '',
    senha: ''
  }

  entrar = () => {
    console.log('e-mail', this.state.email);
    console.log('senha', this.state.senha);
  }

  render(){
    return(
      <div className='container'>
        <div className='row'>
          <div className='col-md-6' style={{position:'relative', left:'300px'}}>
            <Card title="Login">
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='bs-component'>
                    <fieldset>
                      <FormGroup label="E-mail" id="exampleInputEmail">
                          <input type="email" className='form-control'
                            value={this.state.email} onChange={e=> this.setState({email: e.target.value})}
                            id="inputEmail" aria-describedby='emailHelp'
                            placeholder='Digite o e-mail' />
                      </FormGroup>
                      <FormGroup label="Senha" id="exampleInputSenha">
                          <input type="password" className='form-control'
                            value={this.state.senha} onChange={e=> this.setState({senha: e.target.value})}
                            id="inputSenha" aria-describedby='senhaHelp'
                            placeholder='Digite a senha' />
                      </FormGroup>
                      <button onClick={this.entrar} className='btn btn-success'>Entrar</button>
                      <button className='btn btn-danger'>Cadastrar</button>
                    </fieldset>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
    
  }
}

export default Login;