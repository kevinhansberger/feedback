import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import { Avatar, Box, Button, FormHelperText, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import Timeline from '@mui/lab/Timeline';
import { supabase } from '~/utils/supabaseClient';
import { useSession } from '~/context';
import { useEffect, useMemo, useState } from 'react';
import { cleanOrigin } from '~/utils/cleanOrigin';

const getScriptCode = (siteId: string = null) : string => {
  return `<script type="text/javascript">window.$widget = window.$widget || {}; window.WIDGET_SITE_ID = '${siteId}'; (function(w,d){var s = d.createElement('script');s.defer = true;s.src = '//www.widgetscripts.com/embed.js';d.getElementsByTagName('head')[0].appendChild(s);})(window,document);</script>`;
}

export default function InstallSteps() {
  const session = useSession();
  const [sites, setSites] = useState([]);
  const [values, setValues] = useState({
    origin: ''
  });

  useEffect(() => {
    fetchSites();
  }, []);

  const signInWithGitHub = async () => {
    await supabase.auth.signIn({
      provider: 'github'
    }, {
      redirectTo: window.location.origin + '/install'
    });
  }

  const fetchSites = async () => {
    const { data } = await supabase
      .from('fw_sites')
      .select('*');

    if (data.length > 0) {
      setValues(preValues => ({
        ...preValues,
        origin: data[0].origin,
      }));
    }

    setSites(data);
  }

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  }

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data } = await supabase
      .from('fw_sites')
      .insert([
        { origin: cleanOrigin(values.origin), user_id: supabase.auth.user().id }
      ]);

    if (data.length > 0) {
      setValues(preValues => ({
        ...preValues,
        origin: data[0].origin,
      }));

      setSites(data);
    }
  }

  const isSignedIn = Boolean(session);
  const hasSites = (sites.length > 0);
  const scriptCode = useMemo(() => {
    return (sites.length > 0) ? getScriptCode(sites[0].id) : getScriptCode('REPLACE_ME')
  }, [sites]);

  return (
    <Timeline sx={{ px: 0 }}>
      <TimelineItem sx={{ '&:before': { display: 'none' } }}>
        <TimelineSeparator>
          <TimelineDot color="inherit" sx={{ p: 0 }}>
            <Avatar color="primary" sx={{ width: 28, height: 28, backgroundColor: 'primary.main' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>1</Typography>
            </Avatar>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom variant="h6" sx={{ mt: 1 }}>Create your account</Typography>
            <Typography gutterBottom>You'll need an account to add your site and see your customers' feedback responses.</Typography>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={signInWithGitHub}
            disabled={isSignedIn}
            startIcon={(
              <SvgIcon>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </SvgIcon>
            )}
          >
            Sign up with GitHub
          </Button>
          {isSignedIn && <FormHelperText>Already signed in</FormHelperText>}
        </TimelineContent>
      </TimelineItem>
      <TimelineItem sx={{ '&:before': { display: 'none' } }}>
        <TimelineSeparator>
          <TimelineDot color="inherit" sx={{ p: 0 }}>
            <Avatar color="primary" sx={{ width: 28, height: 28, backgroundColor: 'primary.main' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>2</Typography>
            </Avatar>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom variant="h6" sx={{ mt: 1 }}>Add your site</Typography>
            <Typography>Tell us which site you'd like the widget to appear on.</Typography>
          </Box>
          <form onSubmit={handleSubmitForm}>
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                placeholder="example.com"
                name="origin"
                value={values.origin}
                onChange={handleChangeValue}
                disabled={hasSites || !isSignedIn}
              />
              <Button type="submit" variant="contained" disabled={hasSites || !isSignedIn}>
                Add
              </Button>
            </Stack>
          </form>
          {hasSites && <FormHelperText>Site already registered</FormHelperText>}
        </TimelineContent>
      </TimelineItem>
      <TimelineItem sx={{ '&:before': { display: 'none' } }}>
        <TimelineSeparator>
          <TimelineDot color="inherit" sx={{ p: 0 }}>
            <Avatar color="primary" sx={{ width: 28, height: 28, backgroundColor: 'primary.main' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>3</Typography>
            </Avatar>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom variant="h6" sx={{ mt: 1 }}>Embed the script</Typography>
            <Typography gutterBottom>Add this script to your site. You can place it anywhere inside the head or body tags.</Typography>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            size="small"
            disabled={!hasSites}
            value={scriptCode}
            onFocus={(e) => e.target.select()}
            InputProps={{ style: { wordBreak: 'break-all' } }}
            spellCheck={false}
          />
          {!hasSites && <FormHelperText>Need to register a site first</FormHelperText>}
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
