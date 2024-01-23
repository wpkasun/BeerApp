import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchBeers, addFavoriteBeer, removeFavoriteBeer } from '../../store/slices/beersSlice';
import { TYPE, SORT } from '../../types';
import SortButton from '../../components/SortButton';
import { Beer } from '../../types';

import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import styles from './BeerList.module.css';

const BeerList = () => {
  const beerTypes = [
    'ALL',
    'micro',
    'nano',
    'regional',
    'brewpub',
    'large',
    'planning',
    'bar',
    'contract',
    'proprietor',
    'closed',
  ];

  const navigate = useNavigate();

  const { beers, page, favoriteBeers } = useAppSelector((state) => state.beers);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line
  useEffect(() => {
    dispatch(fetchBeers({ per_page: 10, page: 1, sort: 'name:asc' as SORT }));
  }, []);

  const [selectedType, setSelectType] = useState(beerTypes[0]);

  const [sortInAscending, setSortingType] = useState(true);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(
      fetchBeers({
        per_page: 10,
        page,
        by_type: selectedType === 'ALL' ? undefined : (selectedType as TYPE),
        sort: sortInAscending ? ('name:asc' as SORT) : ('name:desc' as SORT),
      })
    );
  };

  const onTypeSelect = (event: SelectChangeEvent) => {
    const selectedType: string = event.target.value;
    setSelectType(selectedType);
    dispatch(
      fetchBeers({
        per_page: 10,
        page: 1,
        by_type: selectedType === 'ALL' ? undefined : (selectedType as TYPE),
        sort: sortInAscending ? ('name:asc' as SORT) : ('name:desc' as SORT),
      })
    );
  };

  const onClickSort = () => {
    dispatch(
      fetchBeers({
        per_page: 10,
        page: 1,
        by_type: selectedType === 'ALL' ? undefined : (selectedType as TYPE),
        sort: !sortInAscending ? ('name:asc' as SORT) : ('name:desc' as SORT),
      })
    );
    setSortingType(prevValue => !sortInAscending);
  };

  const onClickToggleFavorite = (beer: Beer) => {
    dispatch(
      favoriteBeers.find((favoriteBeer) => favoriteBeer.id === beer.id)
        ? removeFavoriteBeer(beer)
        : addFavoriteBeer(beer)
    );
  };

  return (
    <article>
      <section>
        <header>
          <div className={styles.header}>
            <h1>BeerList page</h1>
            <div className={styles.filters}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Type</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={selectedType}
                    label='Type'
                    onChange={onTypeSelect}
                  >
                    {beerTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <SortButton isAscending={sortInAscending} onClick={onClickSort} />
            </div>
          </div>
        </header>
        <main>
          <List>
            {beers.map((beer) => (
              <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={beer.name} secondary={beer.brewery_type} />
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
              </ListItemButton>
            ))}
          </List>
          <Stack spacing={2} alignItems='center'>
            <Pagination count={10} color='primary' page={page} onChange={onPageChange} />
          </Stack>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
