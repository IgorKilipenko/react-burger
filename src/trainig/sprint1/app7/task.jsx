class GoodNews extends React.Component {
  render() {
    return (
      <div className="content">
        <h1 className="content__title">Лента хороших новостей</h1>
        <div id="news-container" className="beautiful-container d-flex-column">
          <section className="post good-news">
            Уникальный зебрёнок в крапинку родился в Кении
          </section>
          <section className="post good-news">
            Туристы обнаружили выживавшую в снегах две недели собаку и вернули
            ее домой
          </section>
          <section className="post good-news">
            На Аляске выбрали самого жирного медведя
          </section>
          <section className="post good-news">
            Хитрый чихуахуа приучился кататься верхом и плавать на своем друге
            лабрадоре
          </section>
          <section className="post good-news">
            Шимпанзе бонобо любят поговорить о еде
          </section>
        </div>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#news-section'))
root.render(<GoodNews />)
