import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Zoom from '@mui/material/Zoom';
import Button from '@mui/material/Button';
import WidgetFrame from './WidgetFrame';
import Grow from '@mui/material/Grow';
import Emoji from './Emoji';
import {
  REACTIONS, REACTION_EMOJIS,
  WIDGET_BUTTON_HEIGHT, WIDGET_OFFSET_X, WIDGET_OFFSET_Y, WIDGET_VIEWER_HEIGHT, WIDGET_VIEWER_WIDTH
} from '~/constants';
import { useWidgetContext } from '~/context';
import CheckIcon from '@mui/icons-material/Check';

const StyledWidgetViewer = styled('div')(({ theme }) => ({
  position: 'fixed',
  left: WIDGET_OFFSET_X,
  bottom: (WIDGET_OFFSET_Y + WIDGET_BUTTON_HEIGHT + (WIDGET_OFFSET_Y / 2)),
  width: WIDGET_VIEWER_WIDTH,
  height: WIDGET_VIEWER_HEIGHT,
  zIndex: 1000,
  borderRadius: 8,
  boxShadow: theme.shadows[12],
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden'
}));

interface ReactionButtonProps {
  value: number;
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

type ErrorType = {
  name: string;
  message: string;
}

type ValuesType = {
  reaction: number | null;
  message: string;
}

export default function WidgetViewer() {
  const { show, setShow, siteId } = useWidgetContext();
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<ErrorType[]>([]);
  const [count, setCount] = useState(0);
  const [values, setValues] = useState<ValuesType>({
    reaction: null,
    message: ''
  });

  useEffect(() => {
    if (success) {
      const interval = setInterval(() => {
        setCount(prevCount => {
          if (prevCount < 100) {
            return prevCount + 1;
          } else {
            setCount(0);
            setShow(false);
            clearInterval(interval);
          }
        });
      }, 100);
    }
  }, [success]);

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

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
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

    const response = await fetch('https://www.widgetscripts.com/api/responses/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reaction: values.reaction,
        message: values.message,
        site_id: siteId,
      })
    });

    if (!response.ok) {
      setSubmitting(false);
      console.error(response.statusText);
      return;
    }

    setSubmitting(false);
    setSuccess(true);
  }

  const handleCloseWidget = () => {
    setShow(false);
  }

  return (
    <Grow in={show} style={{ transformOrigin: '0 100% 0' }}>
      <StyledWidgetViewer>
        <WidgetFrame name="widget-frame-viewer">
          {!success ? (
            <Box sx={{ p: 2 }}>
              <form onSubmit={handleSubmitForm} style={{ margin: 0 }}>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                  Hey! How do you like the site?
                </Typography>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                  {REACTIONS.map((reaction, i) => (
                    <ReactionButton
                      key={i}
                      value={i}
                      selected={i === values.reaction}
                      onChange={handleChangeReaction}
                      error={Error.has('reaction')}
                    >
                      <Emoji code={REACTION_EMOJIS[reaction]} />
                    </ReactionButton>
                  ))}
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
              </form>
              <Backdrop
                open={submitting}
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', color: 'primary.main' }}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', height: WIDGET_VIEWER_HEIGHT }}>
              <Box sx={{ textAlign: 'center', width: '100%' }}>
                <Zoom in={true}>
                  <Box sx={{ position: 'relative', width: 48, height: 48, mx: 'auto', mb: 2 }}>
                    <Avatar sx={{ width: 48, height: 48, backgroundColor: 'primary.light', color: 'primary.main' }}>
                      <CheckIcon />
                    </Avatar>
                    <CircularProgress
                      variant="determinate"
                      value={count}
                      sx={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '52px !important', height: '52px !important',
                        margin: '-2px',
                        '.MuiCircularProgress-circle': {
                          strokeWidth: 1.5
                        }
                      }}
                    />
                  </Box>
                </Zoom>
                <Typography sx={{ fontWeight: 500 }}>Feedback was received!</Typography>
                <Typography component="p" variant="caption" color="text.secondary">You may now close this widget box.</Typography>
                <Button size="small" onClick={handleCloseWidget}>Close</Button>
              </Box>
            </Box>
          )}
          <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center', py: 1 }}>
            <Typography variant="caption" color="text.disabled">
              {`Powered by `}
              <Link color="inherit" href="https://www.widgetscripts.com" target="_blank">
                Feedback
              </Link>
            </Typography>
          </Box>
        </WidgetFrame>
      </StyledWidgetViewer>
    </Grow>
  )
}
