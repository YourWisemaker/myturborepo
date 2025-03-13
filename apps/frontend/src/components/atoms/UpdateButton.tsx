import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchUser } from '../../store/slice/userSlice';

interface UpdateButtonProps {
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
}

const UpdateButton: React.FC<UpdateButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.user);

  const handleFetchUser = () => {
    dispatch(fetchUser());
  };

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={handleFetchUser}
      disabled={loading}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : undefined}
    >
      {loading ? 'Loading...' : 'Fetch User Data'}
    </Button>
  );
};

export default UpdateButton;
