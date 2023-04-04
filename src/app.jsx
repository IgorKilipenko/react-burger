class App extends React.Component {
  state = { trackMouse: false };

  render() {
    const btnClassName = this.state.trackMouse ? 'btn-on' : 'btn-off';
    return (
      <div className={'container d-flex gap20'}>
        <div>
          <h3 className="app__title">Отслеживать движение мыши</h3>
          <button
            className={`btn ${btnClassName}`}
            onClick={() => this.setState({ trackMouse: !this.state.trackMouse })}
          >
            {this.state.trackMouse ? 'Остановить' : 'Начать'}
          </button>
        </div>
        <MouseTrack trackMouse={this.state.trackMouse} />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <App/>
);