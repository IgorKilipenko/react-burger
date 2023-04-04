import React from 'react';
import Film from '../film';
import styles from '../../styles.module.css'

const withFetch = () => class extends React.Component {
    state = {
      isLoading: false,
      hasError: false,
      data: []
    };

    componentDidMount() {
      this.getData();
    }

    getData() {
      this.setState({ ...this.state, hasError: false, isLoading: true });

      fetch('https://api.nomoreparties.co/beatfilm-movies')
        .then((res) => res.json())
        .then((data) =>
          this.setState({ ...this.state, data, isLoading: false })
        )
        .catch((e) => {
          this.setState({ ...this.state, hasError: true, isLoading: false });
        });
    }

    render() {
      const { data, isLoading, hasError } = this.state;
      return (
        <section className={styles.grid}>
          {isLoading && "Загрузка..."}
          {hasError && "Произошла ошибка"}
          {!isLoading &&
          !hasError &&
          data.length &&
          data.map((film, index) => <Film key={index} data={film} />)}
        </section>
      );
    }
};

export default withFetch;