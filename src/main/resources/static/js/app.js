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
    
    render(){
        const mastersList = this.state.masters.map((currentMaster)=>
        (
                <div>
                    <Master/>
                </div>
        ));
        return(
                <div>
                    <div>Hello World</div>
                    <div>
                        {mastersList}
                    </div>
                </div>
        );
    }
}

class Master extends React.Component{
    render(){
        return(<div>
                A master
                </div>)
    }
}
//Responsável pela renderização do dashboard na div de id = content
ReactDOM.render(
  <MastersDashboard />,
  document.getElementById('content')
);
