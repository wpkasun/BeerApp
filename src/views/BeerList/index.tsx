import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchBeers } from '../../store/slices/beersSlice';
import { ApiParams } from '../../types';
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const BeerList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data } = useAppSelector((state) => state.beers);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line
  useEffect(() => {
    dispatch(fetchBeers({ per_page: 10, page: 1 }));
  }, []);

  /*const {
    data: movies,
    page,
    hasNextPage,
    error,
    isLoading,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies({ page, query }));
  }, [query]);

  const fetchNextPage = useCallback(
    () => dispatch(fetchMovies({ page, query })),
    [page, query]
  );*/

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(fetchBeers({ per_page: 10, page }));
  };

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <List>
            {data.map((beer) => (
              <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={beer.name} secondary={beer.brewery_type} />
              </ListItemButton>
            ))}
          </List>
          <Stack spacing={2} alignItems="center">
            <Pagination count={10} color="primary" page={page} onChange={onPageChange} />
          </Stack>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
