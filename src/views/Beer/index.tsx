import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { addFavoriteBeer, removeFavoriteBeer } from '../../store/slices/beersSlice';
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
import Grid from '@mui/material/Grid';

import MapContainer from '../../components/MapContainer';

import styles from './Beer.module.css';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  const dispatch = useAppDispatch();

  const { favoriteBeers } = useAppSelector((state) => state.beers);

  const onClickToggleFavorite = (beer: IBeer) => {
    dispatch(
      favoriteBeers.find((favoriteBeer) => favoriteBeer.id === beer.id)
        ? removeFavoriteBeer(beer)
        : addFavoriteBeer(beer)
    );
  };

  const navigate = useNavigate();

  const onBackButtonClick = () => navigate(-1);

  return (
    <article>
      {beer ? (
        <section>
          <header className={styles.beerHeader}>
            <h1>{beer.name}</h1>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                onClickToggleFavorite(beer);
              }}
            >
              {favoriteBeers.find((favoriteBeer) => favoriteBeer.id === beer.id) ? (
                <FavoriteIcon color='primary' />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </IconButton>
          </header>
          <main>
            <Grid container spacing={10}>
              <Grid item xs={12} md={12} lg={4} xl={3}>
                <div className={styles.type}>
                  <b>Type: </b> {beer.brewery_type}
                </div>
                <div className={styles.beerSection}>
                  <LanguageIcon className={styles.icon} />
                  <a href={beer.website_url} target='_blank'>
                    {beer.website_url}
                  </a>
                </div>
                <Divider className={styles.divider} />
                <div className={styles.beerSection}>
                  <PhoneIcon className={styles.icon} /> {beer.phone}
                </div>
                <Divider className={styles.divider} />
                <div className={styles.beerSection}>
                  <LocationOnIcon className={styles.icon} />
                  {beer.address_1}
                  {beer.address_2 ? `, ${beer.address_2}` : ''}
                  {beer.address_3 ? `, ${beer.address_3}` : ''}
                  {`, ${beer.city}`}
                  {`, ${beer.state_province}`}
                  {`, ${beer.country}. `}
                  {`[${beer.postal_code}]`}
                </div>
              </Grid>
              <Grid item xs={12} md={12} lg={8} xl={9}>
                <MapContainer latitude={parseInt(beer.latitude)} longitude={parseInt(beer.longitude)} />
              </Grid>
            </Grid>

            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={styles.backButton}
              onClick={onBackButtonClick}
            >
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
