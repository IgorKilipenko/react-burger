const Film = ({ data }) => {
  const image = (
    <img
      src={
        data.image
          ? `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`
          : 'https://via.placeholder.com/250x150'
      }
      alt={data.nameRU}
    />
  )
  return (
    <div>
      <div className={'img'}>{image}</div>
      <p className={'name'}>{data.nameRU}</p>
      <p className={'description'}>{`${data.year}, ${data.country}`}</p>
      <p className={'description'}>{`${data.duration} мин.`}</p>
    </div>
  )
}

class App extends React.Component {
  state = {
    isLoading: false,
    hasError: false,
    data: [],
  }

  componentDidMount() {
    this.getFilms()
  }

  getFilms = () => {
    this.setState({ ...this.state, hasError: false, isLoading: true })

    const endpoint = 'https://api.nomoreparties.co/beatfilm-movies'
    fetch(endpoint)
      .then((response) => response.json())
      .then((responseData) => {
        const error = responseData.error
        this.setState({
          ...this.state,
          data: error ? [] : responseData,
          hasError: error ? true : false,
          isLoading: false,
        })
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          data: [],
          hasError: true,
          isLoading: false,
        })
      })
  }

  render() {
    const { data, isLoading, hasError } = this.state
    return (
      <div className="app grid">
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading &&
          !hasError &&
          !!data.length &&
          data.map((film, index) => <Film key={index} data={film} />)}
      </div>
    )
  }
}
