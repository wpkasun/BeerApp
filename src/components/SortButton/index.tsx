import Button from '@mui/material/Button';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from './SortButton.module.css';

interface Props {
  isAscending: boolean;
  onClick: () => void;
}

const SortButton: React.FC<Props> = ({ isAscending, onClick }) => {
  return (
    <Button variant="outlined" className={styles.sortArrows} onClick={onClick}>
      <ArrowDropUpIcon color={isAscending ? 'disabled' : 'primary'} />
      <ArrowDropDownIcon color={isAscending ? 'primary' : 'disabled'} />
    </Button>
  );
};

export default SortButton;
