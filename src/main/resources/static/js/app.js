class MastersDashboard extends React.Component{
    render(){
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
