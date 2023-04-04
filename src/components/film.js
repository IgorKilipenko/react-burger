import React from 'react';
import styles from '../styles.module.css'

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
  );
  return (
    <article>
      <div className={styles.img}>
        {image}
      </div>
      <h2 className={styles.name}>{data.nameRU}</h2>
      <p className={styles.description}>{`${data.year}, ${data.country}`}</p>
      <p className={styles.description}>{`${data.duration} мин.`}</p>
    </article>
  );
};

export default Film;