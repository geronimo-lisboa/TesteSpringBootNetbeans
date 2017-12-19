class MastersDashboard extends React.Component{
    //O estado começa com uma lista vazia de masters. Quando o componente tiver
    //sido instalado na tela a lista será populada com dados do banco.
    state = {
        masters:[]
    };
    
    componentDidMount(){
        this.loadMastersFromServer();
        setInterval(this.loadMastersFromServer(), 5000);
    }
    
    loadMastersFromServer = ()=>{
        client.getAllMasters((masters)=>(
             this.setState({state:masters})
        ));
    }
    
    render(){
        const masterList = this.state.masters.map((current)=>{
            console.log(current);
        });
        return(
                <div>
                Hello World
                </div>
        )
    }
}
//Responsável pela renderização do dashboard na div de id = content
ReactDOM.render(
  <MastersDashboard />,
  document.getElementById('content')
);
