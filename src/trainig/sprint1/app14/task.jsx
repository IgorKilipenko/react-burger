const Description = (props) => {
  return (
    <section className="description">
      <h2 className="card__subtitle">{props.subtitle}</h2>
      <p className="card__text mb-1">{props.text.first}</p>
      <p className="card__text">{props.text.second}</p>
    </section>
  )
}

const Delorean = () => {
  const data = {
    common: {
      subtitle: 'Общие данные',
      years: '1981—1983',
      class: 'Спортивный автомобиль',
      dev: 'DeLorean Motor Company',
      dis: 'Джорджетто Джуджаро',
    },
    sizeSpecs: {
      subtitle: 'Массово-габаритные характеристики',
      length: '4216 мм',
      width: '1857',
      height: '1140 мм с закрытыми дверьми',
      clearance: '155 мм',
      wheelbase: '2414 мм',
      weight: '1230 кг',
    },
    speedSpecs: {
      subtitle: 'Динамические характеристики',
      acceleration: '10,5 с',
      maxSpeed: '177 км/ч',
    },
    description: {
      subtitle: 'О модели',
      text: {
        first: `DeLorean DMC-12 — спортивный автомобиль, который выпускался в
        Северной Ирландии для американской автомобильной компании DeLorean Motor Company с 1981 по 1983 год.`,
        second: `Более распространённым названием стало DeLorean, так как это была единственная модель,
        выпускавшаяся компанией. В DMC-12 были использованы двери типа «крыло чайки». Первый опытный образец
        DeLorean Safety Vehicle (DSV) появился в марте 1977 года, а производство началось в 1981 году (первый
        DMC-12 сошёл с конвейера 21 января на фабрике DMC в Dunmurry в Северной Ирландии). В течение его 
        производства несколько деталей автомобиля были изменены (капот, колеса и интерьер). До прекращения
        производства в 1983 году было изготовлено около девяти тысяч экземпляров DMC-12, из которых примерно
        восемь тысяч сохранились до наших дней.`,
      },
    },
  }
  return (
    <article className="card">
      <div className="card__heading">
        <img
          className="card__img"
          src="./images/car.png"
          alt="фото автомобиля."
        />
        <h1 className="card__title">
          DELOREAN <br />
          DMC-12
        </h1>
      </div>
      <div className="card__data-box">
        <h2 className="card__subtitle">{data.common.subtitle}</h2>
        <div className="card__two-columns">
          <p className="card__text">Годы производства</p>
          <p className="card__text">{data.common.years}</p>
          <p className="card__text">Класс</p>
          <p className="card__text">{data.common.class}</p>
          <p className="card__text">Производитель</p>
          <p className="card__text">{data.common.dev}</p>
          <p className="card__text">Дизайнер</p>
          <p className="card__text">{data.common.dis}</p>
        </div>
      </div>
      <div className="card__data-box">
        <h2 className="card__subtitle">{data.sizeSpecs.subtitle}</h2>
        <div className="card__two-columns">
          <p className="card__text">Длина</p>
          <p className="card__text">{data.sizeSpecs.length}</p>
          <p className="card__text">Ширина</p>
          <p className="card__text">{data.sizeSpecs.width}</p>
          <p className="card__text">Высота</p>
          <p className="card__text">{data.sizeSpecs.height}</p>
          <p className="card__text">Клиренс</p>
          <p className="card__text">{data.sizeSpecs.clearance}</p>
          <p className="card__text">Колёсная база</p>
          <p className="card__text">{data.sizeSpecs.wheelbase}</p>
          <p className="card__text">Масса</p>
          <p className="card__text">{data.sizeSpecs.weight}</p>
        </div>
      </div>
      <div className="card__data-box">
        <h2 className="card__subtitle">{data.speedSpecs.subtitle}</h2>
        <div className="card__two-columns">
          <p className="card__text">Разгон до 100 км/ч</p>
          <p className="card__text">{data.speedSpecs.acceleration}</p>
          <p className="card__text">Максимальная скорость</p>
          <p className="card__text">{data.speedSpecs.maxSpeed}</p>
        </div>
      </div>
      <Description {...data.description} />
    </article>
  )
}

const App = () => {
  return <Delorean />
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
