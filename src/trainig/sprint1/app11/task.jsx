class Page extends React.Component {
  render() {
    return (
      <div className={`app ${this.props.img}`}>
        <h1 className="app__greeting">{this.props.greeting}</h1>
      </div>
    )
  }
}

class CurrentTime extends React.Component {
  render() {
    const time = new Date().getHours()
    const theme = {}
    if (time >= 4 && time < 12) {
      theme.img = 'morning'
      theme.greeting = 'Доброе утро'
    } else if (time >= 12 && time < 16) {
      theme.img = 'afternoon'
      theme.greeting = 'Добрый день'
    } else if (time >= 16 && time < 23) {
      theme.img = 'evening'
      theme.greeting = 'Добрый вечер'
    } else if (time >= 23 || time < 4) {
      theme.img = 'night'
      theme.greeting = 'Доброй ночи'
    }

    return <Page {...theme} />
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<CurrentTime />)
