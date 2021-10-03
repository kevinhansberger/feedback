import React from 'react';
import { styled } from '@mui/material/styles';
import { Fab } from '@mui/material';
import WidgetFrame from './WidgetFrame';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Emoji from './Emoji';

const StyledWidgetButton = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: 'var(--widget-offset-y)',
  left: 'var(--widget-offset-x)',
  width: 'var(--widget-button-width)',
  height: 'var(--widget-button-height)',
  zIndex: 2000,
  boxShadow: theme.shadows[12],
  borderRadius: 'var(--widget-button-width)',
}));

export default function WidgetButton({ show, onShow, ...rest }) {
  return (
    <StyledWidgetButton>
      <WidgetFrame {...rest}>
        <Fab 
        sx={{ 
          boxShadow: 'none !important', 
          backgroundColor: 'background.paper', 
          color: 'text.secondary' 
        }} 
        onClick={onShow}
        >
          {show ? (
            <CloseRoundedIcon />
          ) : (
            <Emoji>
              &#128578;
            </Emoji>
          )}
        </Fab>
      </WidgetFrame>
    </StyledWidgetButton>
  )
}
