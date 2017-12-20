///Esse componente serve para conter a lista de masters e o painel de criação
//de novos masters
class MastersDashboard extends React.Component{
    //O estado começa com uma lista vazia de masters. Quando o componente tiver
    //sido instalado na tela a lista será populada com dados do banco.
    state = {
        masters:[]
    };
    
    componentDidMount(){
        this.loadMastersFromServer();
    }
    //Faz o fetch da lista de masters
    loadMastersFromServer = ()=>{        
        client.getAllMasters((serverMasters) => (
            this.setState({ masters: serverMasters })
            )
        );
    }
    //Aqui manda pro serviço que cria um novo master e depois pede a lista 
    //atualizada de volta.
    handleNewMaster = (newMasterData)=>{
        client.createMaster(newMasterData, this.loadMastersFromServer);
    };
    
    handleDeleteMaster = (masterId)=>{
        const masterToDie = {
            id:masterId,
            nome:"!doesn't matter!",
            detailList:[],
        }
        client.deleteMaster(masterToDie, this.loadMastersFromServer);
    };
   
    handleChangeMaster = (modifiedMaster)=>{
        client.updateMaster(modifiedMaster, this.loadMastersFromServer);
    }
   
    render(){
        const mastersList = this.state.masters.map((currentMaster)=>
        (
                <div>
                    <Master
                    key={currentMaster.id}
                    id={currentMaster.id}
                    nome={currentMaster.nome}
                    detailList={currentMaster.detailList}
                    onDeleteMaster={this.handleDeleteMaster}
                    onChangeMaster={this.handleChangeMaster}/>
                </div>
        ));
        return(
                <div>
                    <div>Hello World React+REST+JPA - Lista de masters & details</div>
                    <div>
                        {mastersList}
                    </div>
                    <div>
                        <NewMasterForm
                        onNewMasterFormSubmit ={this.handleNewMaster}
                        />
                    </div>
                </div>
        );
    }
}
//O formulário para a criação de novos masters.
class NewMasterForm extends React.Component{
    state={
        isHidden:true,
        name:"",
    };
    showNewMasterForm = ()=>(this.setState({isHidden:false}));
    hideNewMasterForm = ()=>(this.setState({isHidden:true}));
    handleOnTextChange = (e)=>{
        this.setState({name:e.target.value});
    };
    handleSubmit = ()=>{
        this.hideNewMasterForm();
        this.props.onNewMasterFormSubmit({
            nome : this.state.name,
        });
    };
    render(){
        if(this.state.isHidden === false)
        {
        return(<div>
                <div><button onClick={this.hideNewMasterForm}>Fechar</button></div>
                <div>
                    <label>Nome</label>
                    <input type='text' value={this.state.name} onChange={this.handleOnTextChange}/>
                </div>
                <div>
                    <button onClick={this.handleSubmit}>Criar</button>
                </div>                
                </div>);
        }else{
            return(<div>
                    <button onClick={this.showNewMasterForm}>Novo Master</button>
                    </div>);
        }
    }
}

class Master extends React.Component{
    state = {
        showDetails : false,
    };
    handleDeleteClick = ()=>{
        this.props.onDeleteMaster(this.props.id);
    }
    handleExpandirClick = ()=>{
        if(this.state.showDetails===false){
            this.setState({showDetails:true});
        }else{
            this.setState({showDetails:false});
        }
    }
    //Pega o nome modificado
    handleOnNameChange = (e)=>{
        const changedData = {
            id:this.props.id,
            nome:e.target.value,
            detailList:this.props.detailList};
        this.props.onChangeMaster(changedData);

    }
    render(){
        if(this.state.showDetails===false)
        {
            return(<div>
                {this.props.nome}
                <button onClick={this.handleExpandirClick}>Expandir</button>
                <button onClick={this.handleDeleteClick}>Excluir</button>
                </div>)            
        }else{//Essa é a versão para edição. Na versão para edição o nome é alterável
            //e posso adicionar e remover details
            return(<div>
                <input type='text' value={this.props.nome} onChange={this.handleOnNameChange}/>                
                <button onClick={this.handleExpandirClick}>Ocultar</button>
                <button onClick={this.handleDeleteClick}>Excluir</button>
                </div>)                        
        }
    }
}


//Responsável pela renderização do dashboard na div de id = content
ReactDOM.render(
  <MastersDashboard />,
  document.getElementById('content')
);
