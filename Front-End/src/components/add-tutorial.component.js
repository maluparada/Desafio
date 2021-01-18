import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import UploadImages from "../components/image-upload.component";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    this.onChangeModelo = this.onChangeModelo.bind(this);
    this.onChangeNiveldesaude = this.onChangeNiveldesaude.bind(this);
    this.onChangeResponsavel = this.onChangeResponsavel.bind(this);
    this.onChangeAtivo = this.onChangeAtivo.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      title: "", 
      published: false,
      descricao: "",
      modelo: "",
      niveldesaude: "",
      responsavel: "",
      ativo: "",

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeModelo(e) {
    this.setState({
      modelo: e.target.value
    });
  }

  onChangeNiveldesaude(e) {
    this.setState({
      niveldesaude: e.target.value
    });
  }

  onChangeResponsavel(e) {
    this.setState({
      responsavel: e.target.value
    });
  }

  onChangeAtivo(e) {
    this.setState({
      ativo: e.target.value
    });
  }

  onChangeDescricao(e) {
    this.setState({
      descricao: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      title: this.state.title,
      modelo: this.state.modelo,
      niveldesaude: this.state.niveldesaude,
      responsavel: this.state.responsavel,
      ativo: this.state.ativo,
      descricao: this.state.descricao
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          published: response.data.published,
          descricao: response.data.descricao,
          modelo: response.data.modelo,
          niveldesaude: response.data.niveldesaude,
          responsavel: response.data.responsavel,
          ativo: response.data.ativo,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      published: false,
      descricao: "",
      modelo: "",
      niveldesaude: "",
      responsavel: "",
      ativo: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Ativo cadastrado com sucesso!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Adicionar mais um ativo
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">ID da Unidade</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="descricao">Descrição</label>
              <input
                type="text"
                className="form-control"
                id="descricao"
                required
                value={this.state.descricao}
                onChange={this.onChangeDescricao}
                name="descricao"
              />
            </div>

            <div className="form-group">
              <label htmlFor="modelo">Modelo</label>
              <input
                type="text"
                className="form-control"
                id="modelo"
                required
                value={this.state.modelo}
                onChange={this.onChangeModelo}
                name="modelo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="niveldesaude">Nível de Saúde</label>
              <input
                type="text"
                className="form-control"
                id="niveldesaude"
                required
                value={this.state.niveldesaude}
                onChange={this.onChangeNiveldesaude}
                name="niveldesaude"
              />
            </div>

            <div className="form-group">
              <label htmlFor="responsavel">Responsável</label>
              <input
                type="text"
                className="form-control"
                id="responsavel"
                required
                value={this.state.responsavel}
                onChange={this.onChangeResponsavel}
                name="responsavel"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ativo">Nome do Ativo</label>
              <input
                type="text"
                className="form-control"
                id="ativo"
                required
                value={this.state.ativo}
                onChange={this.onChangeAtivo}
                name="ativo"
              />
            </div>
          
            <button onClick={this.saveTutorial} className="btn btn-success">
              Cadastrar
            </button>

            <div className="container">
      <div className="content">
        <UploadImages />
      </div>
    </div>

          </div>
        )}
      </div>

    );
  }
}
