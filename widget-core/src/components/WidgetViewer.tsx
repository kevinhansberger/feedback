import React, { useEffect, useState } from 'react';
import { styled, Theme } from '@mui/material/styles';
import { Backdrop, Box, CircularProgress, Stack, TextField, ToggleButton, Typography } from '@mui/material';
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
  overflow: 'hidden'
}));

interface ReactionButtonProps {
  value: string;
  selected: boolean;
  error?: boolean;
  onChange: (newValue) => void;
  children: React.ReactElement;
}

// @ts-ignore
function ReactionButton(props: ReactionButtonProps) {
  const { value, selected, onChange, error, children, ...rest } = props;

  return (
    <ToggleButton
      value={value}
      selected={selected}
      onChange={() => onChange(value)}
      sx={{
        width: 58,
        borderColor: error ? (theme) => theme.palette.error.light : null,
        transition: (theme) => (theme.transitions.create('background-color', {
          duration: theme.transitions.duration.shorter,
        })),
        '&.Mui-selected, &.Mui-selected:hover': {
          borderColor: (theme) => theme.palette.primary.main,
          backgroundColor: (theme) => theme.palette.primary.light,
        }
      }}
      {...rest}
    >
      {children}
    </ToggleButton>
  )
}

const reactions = {
  BAD: 'BAD', DECENT: 'DECENT', GOOD: 'GOOD', AMAZING: 'AMAZING'
}

type ErrorType = {
  name: string;
  message: string;
}

export default function WidgetViewer({ show, onClose, ...rest }) {
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<ErrorType[]>([]);
  const [values, setValues] = useState({
    reaction: null,
    message: ''
  });

  useEffect(() => {
    console.log(values);
  }, [values]);

  const handleChangeReaction = (newValue) => {
    if (newValue !== '') {
      Error.clear('reaction');
    }

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

  const Error = {
    has(name: string): boolean {
      return errors.findIndex(e => e.name === name) !== -1;
    },
    clear(name: string): void {
      setErrors(prevErrors => ([
        ...prevErrors.filter(e => e.name !== name)
      ]))
    },

  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errors = [];
    setSubmitting(true);

    // Validation
    if (values.reaction === null) {
      errors.push({
        name: 'reaction',
        message: 'Your reaction is required'
      });
    }

    if (errors.length > 0) {
      setErrors(errors);
      setSubmitting(false);
      return;
    }

    // Simulate ajax request
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <Grow in={show} style={{ transformOrigin: '0 100% 0' }}>
      <StyledWidgetViewer>
        <WidgetFrame {...rest}>
          {!success ? (
            <form onSubmit={handleSubmitForm}>
              <Box sx={{ p: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                  Hey! How do you like the site?
                </Typography>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                  <ReactionButton
                    value={reactions.BAD}
                    selected={reactions.BAD === values.reaction}
                    onChange={handleChangeReaction}
                    error={Error.has('reaction')}
                  >
                    <Emoji>
                      &#128546;
                    </Emoji>
                  </ReactionButton>
                  <ReactionButton
                    value={reactions.DECENT}
                    selected={reactions.DECENT === values.reaction}
                    onChange={handleChangeReaction}
                    error={Error.has('reaction')}
                  >
                    <Emoji>
                      &#128528;
                    </Emoji>
                  </ReactionButton>
                  <ReactionButton
                    value={reactions.GOOD}
                    selected={reactions.GOOD === values.reaction}
                    onChange={handleChangeReaction}
                    error={Error.has('reaction')}
                  >
                    <Emoji>
                      &#128578;
                    </Emoji>
                  </ReactionButton>
                  <ReactionButton
                    value={reactions.AMAZING}
                    selected={reactions.AMAZING === values.reaction}
                    onChange={handleChangeReaction}
                    error={Error.has('reaction')}
                  >
                    <Emoji>
                      &#128525;
                    </Emoji>
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
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={submitting}
                >
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
          <Backdrop
            open={submitting}
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', color: 'primary.main' }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </WidgetFrame>
      </StyledWidgetViewer>
    </Grow>
  )
}
