import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    this.onChangeModelo = this.onChangeModelo.bind(this);
    this.onChangeNiveldesaude = this.onChangeNiveldesaude.bind(this);
    this.onChangeResponsavel = this.onChangeResponsavel.bind(this);
    this.onChangeAtivo = this.onChangeAtivo.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        title: "",
        published: false,
        descricao: "",
        modelo: "",
        niveldesaude: "",
        responsavel: "",
        ativo: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTutorial(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: title
        }
      };
    });
  }

  onChangeDescricao(e) {
    const descricao = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          descricao: descricao
        }
      };
    });
  }

  onChangeModelo(e) {
    const modelo = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          modelo: modelo
        }
      };
    });
  }

  onChangeNiveldesaude(e) {
    const niveldesaude = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          niveldesaude: niveldesaude
        }
      };
    });
  }

  onChangeResponsavel(e) {
    const responsavel = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          responsavel: responsavel
        }
      };
    });
  }

  onChangeAtivo(e) {
    const ativo = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        ativo: ativo
      }
    }));
  }

  getTutorial(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTutorial.id,
      title: this.state.currentTutorial.title,
      descricao: this.state.currentTutorial.descricao,
      modelo: this.state.currentTutorial.modelo,
      niveldesaude: this.state.currentTutorial.niveldesaude,
      responsavel: this.state.currentTutorial.responsavel,
      ativo: this.state.currentTutorial.ativo,
      published: status
    };

    TutorialDataService.update(this.state.currentTutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorial() {
    TutorialDataService.update(
      this.state.currentTutorial.id,
      this.state.currentTutorial
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Os ativos foram atualizados com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutorial() {    
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorials')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTutorial } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Ativos</h4>
            <form>

              <div className="form-group">
                <label htmlFor="title">ID da Unidade</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.title}
                  onChange={this.onChangeTitle}
                />
              </div>

              <div className="form-group">
                <label htmlFor="descricao">Descrição</label>
                <input
                  type="text"
                  className="form-control"
                  id="descricao"
                  value={currentTutorial.descricao}
                  onChange={this.onChangeDescricao}
                />
              </div>

              <div className="form-group">
                <label htmlFor="modelo">Modelo</label>
                <input
                  type="text"
                  className="form-control"
                  id="modelo"
                  value={currentTutorial.modelo}
                  onChange={this.onChangeModelo}
                />
              </div>
          
              <div className="form-group">
                <label htmlFor="niveldesaude">Nível de Saúde</label>
                <input
                  type="text"
                  className="form-control"
                  id="niveldesaude"
                  value={currentTutorial.niveldesaude}
                  onChange={this.onChangeNiveldesaude}
                />
              </div>

              <div className="form-group">
                <label htmlFor="responsavel">Responsável</label>
                <input
                  type="text"
                  className="form-control"
                  id="responsavel"
                  value={currentTutorial.responsavel}
                  onChange={this.onChangeResponsavel}
                />
              </div>

              <div className="form-group">
                <label htmlFor="ativo">Ativo</label>
                <input
                  type="text"
                  className="form-control"
                  id="ativo"
                  value={currentTutorial.ativo}
                  onChange={this.onChangeAtivo}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Disponível" : "Desativado"}
              </div>
            </form>

            {currentTutorial.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                Disponível
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Desativado
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Deletar
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Atualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecione um ativo para obter mais informações.</p>
          </div>
        )}
      </div>
    );
  }
}