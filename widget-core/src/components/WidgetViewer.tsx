import React, { useEffect, useState } from 'react';
import { styled, Theme } from '@mui/material/styles';
import { Box, Stack, TextField, ToggleButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import WidgetFrame from './WidgetFrame';
import Grow from '@mui/material/Grow';
import Emoji from './Emoji';

const StyledWidgetViewer = styled('div')(({ theme }) => ({
  position: 'fixed',
  left: 'var(--widget-offset-x)',
  bottom: `calc(var(--widget-offset-y) + var(--widget-button-height) + (var(--widget-offset-y) / 2))`,
  width: 300,
  height: 241,
  zIndex: 1000,
  borderRadius: 8,
  boxShadow: theme.shadows[12],
  backgroundColor: theme.palette.background.paper,
}));

// @ts-ignore
function ReactionButton({ value, selected, onChange, children, ...rest }) {
  return (
    <ToggleButton
      value={value}
      selected={selected}
      onChange={() => onChange(value)}
      sx={{
        width: 58,
        '&.Mui-selected, &.Mui-selected:hover': {
          borderColor: (theme: Theme) => theme.palette.primary.main,
          backgroundColor: (theme: Theme) => theme.palette.primary.light,
        }
      }}
      {...rest}
    >
      <Emoji>
        {children}
      </Emoji>
    </ToggleButton>
  )
}

const reactions = {
  BAD: 'BAD', DECENT: 'DECENT', GOOD: 'GOOD', AMAZING: 'AMAZING'
}

export default function WidgetViewer({ show, onClose, ...rest }) {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({
    reaction: reactions.GOOD,
    message: ''
  });

  useEffect(() => {
    console.log(values);
  }, [values]);

  const handleChangeReaction = (newValue) => {
    setValues(prevValues => ({
      ...prevValues,
      reaction: newValue,
    }));
  };

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prevValues => ({
      ...prevValues,
      message: event.target.value,
    }));
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <Grow in={show} style={{ transformOrigin: '0 100% 0' }}>
      <StyledWidgetViewer>
        <WidgetFrame {...rest}>
          {!submitted ? (
            <form onSubmit={handleSubmitForm}>
              <Box sx={{ p: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                  Hey! How do you like the site?
                </Typography>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                  <ReactionButton value={reactions.BAD} selected={reactions.BAD === values.reaction} onChange={handleChangeReaction}>
                    &#128546;
                  </ReactionButton>
                  <ReactionButton value={reactions.DECENT} selected={reactions.DECENT === values.reaction} onChange={handleChangeReaction}>
                    &#128528;
                  </ReactionButton>
                  <ReactionButton value={reactions.GOOD} selected={reactions.GOOD === values.reaction} onChange={handleChangeReaction}>
                    &#128578;
                  </ReactionButton>
                  <ReactionButton value={reactions.AMAZING} selected={reactions.AMAZING === values.reaction} onChange={handleChangeReaction}>
                    &#128525;
                  </ReactionButton>
                </Stack>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="message"
                  value={values.message}
                  placeholder="Anything we can do better?"
                  size="small"
                  onChange={handleChangeValue}
                  sx={{ mb: 2 }}
                />
                <Button fullWidth type="submit" variant="contained" color="primary" size="large">
                  Let us know!
                </Button>
                <Box sx={{ mb: -1, textAlign: 'right' }}>
                  <Typography variant="caption" color="text.disabled">
                    Feedback Widget
                  </Typography>
                </Box>
              </Box>
            </form>
          ) : (
            <div>
              Thank you!
            </div>
          )}
        </WidgetFrame>
      </StyledWidgetViewer>
    </Grow>
  )
}
