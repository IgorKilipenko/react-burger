/* eslint-disable react/react-in-jsx-scope */
class FavoriteFood extends React.Component {
  render() {
    const { name, photo, country } = this.props.favorite
    return (
      <div className="content" style={{ backgroundImage: `url(${photo})` }}>
        <p className="text-food">Ваше любимое блюдо</p>
        <h1 className="title">{name}</h1>
        <p className="text-country">{`Страна: ${country}`}</p>
      </div>
    )
  }
}

const meals = [
  { name: 'Паста', photo: './images/1.png', country: 'Италия' },
  { name: 'Гамбургер', photo: './images/2.png', country: 'США/Германия' },
  { name: 'Ренданг', photo: './images/3.png', country: 'Индонезия' },
  { name: 'Том Ям', photo: './images/4.png', country: 'Тайланд' },
  { name: 'Утка по-пекински', photo: './images/5.png', country: 'Китай' },
  { name: 'Суши', photo: './images/6.png', country: 'Япония' },
  { name: 'Хачапури', photo: './images/7.png', country: 'Грузия' },
]

class App extends React.Component {
  randomMeal(arr) {
    /* Ваш код здесь */
  }

  render() {
    return <FavoriteFood favorite={this.randomMeal(meals)} />
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
