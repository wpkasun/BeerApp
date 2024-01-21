import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { addFavoriteBeer } from '../../store/slices/beersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useParams, useNavigate } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Button from '@mui/material/Button';

import MapContainer from '../../components/MapContainer';

import styles from './Beer.module.css';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  const dispatch = useAppDispatch();

  const onClickFavorite = (beer: IBeer) => {
    dispatch(addFavoriteBeer(beer));
  };
  const navigate = useNavigate();

  const onBackButtonClick = () => navigate(`/beer/${id}`);

  return (
    <article>
      {beer ? (
        <section>
          <header className={styles.beerHeader}>
            <h1>{beer.name}</h1>
            <IconButton onClick={() => onClickFavorite(beer)}>
              <FavoriteBorderOutlinedIcon />
            </IconButton>
          </header>
          <main>
            <span>
              <b>Type: </b> {beer.brewery_type}
            </span>
            <Divider className={styles.beerSectionDivider} />
            <section className={styles.beerSection}>
              <LanguageIcon className={styles.beerIcon} />
              <a href={beer.website_url} target="_blank">
                {beer.website_url}
              </a>
            </section>
            <Divider className={styles.beerSectionDivider} />
            <section className={styles.beerSection}>
              <PhoneIcon className={styles.beerIcon} /> {beer.phone}
            </section>
            <Divider className={styles.beerSectionDivider} />
            <section className={styles.beerSection}>
              <LocationOnIcon className={styles.beerIcon} />
              {beer.address_1}
              {beer.address_2 ? `, ${beer.address_2}` : ''}
              {beer.address_3 ? `, ${beer.address_3}` : ''}
              {`, ${beer.city}`}
              {`, ${beer.state_province}`}
              {`, ${beer.country}.`}
              <b>Postal Code: </b>
              {beer.postal_code}
            </section>

            <MapContainer latitude={parseInt(beer.latitude)} longitude={parseInt(beer.longitude)} />

            <Button className={styles.button} variant="contained" color="primary" onClick={onBackButtonClick}>
              Back
            </Button>
          </main>
        </section>
      ) : (
        <h1>Error: This beer not available</h1>
      )}
    </article>
  );
};

export default Beer;
