import { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import {
  TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Alert, Button, Toolbar, Typography,
  Chip, Avatar, IconButton, Tooltip
} from '@mui/material';
import { supabase } from '~/utils/supabaseClient';
import { REACTION_EMOJIS, REACTIONS } from '~/constants';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Emoji from '~/components/Emoji';

type Responses = {
  id: string;
  site_id: string;
  reaction: number;
  message: string;
  metadata: object;
  created_at: string;
}

export default function ResponsesTable() {
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<Responses[]>([]);

  const fetchResponses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('fw_sites')
        .select(`
          id, origin, created_at,
          fw_responses (
            id, reaction, message, created_at
          )
        `)
        .order('created_at', { ascending: false, foreignTable: 'fw_responses' });

      if (data.length > 0) {
        setResponses(data[0].fw_responses);
      }

      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchResponses();
  }, []);

  const handleRefresh = () => {
    fetchResponses();
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <Toolbar variant="dense" sx={{ px: { sm: 3 } }}>
        <Typography component="div" variant="h5" sx={{ mr: 2 }}>
          Responses
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          startIcon={<RefreshIcon />}
          disabled={loading}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </Toolbar>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="right" style={{ width: 1 }}>#</TableCell>
              <TableCell>Reaction</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responses.length > 0 ? responses.map((response, i) => (
              <TableRow key={response.id} hover>
                <TableCell align="right">
                  <Typography variant="caption" color="text.secondary">{i+1}</Typography>
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  <Chip
                    sx={{ backgroundColor: 'background.paper' }}
                    avatar={(
                      <Avatar sx={{ backgroundColor: 'transparent', mb: '-2px' }}>
                        <Emoji>
                          {REACTION_EMOJIS[REACTIONS[response.reaction]]}
                        </Emoji>
                      </Avatar>
                    )}
                    label={REACTIONS[response.reaction]}
                    variant="outlined"
                  />
                  {/*<Box*/}
                  {/*  component="span"*/}
                  {/*  dangerouslySetInnerHTML={{ __html: REACTION_EMOJIS[REACTIONS[response.reaction]] }}*/}
                  {/*  sx={{ fontSize: '16px', color: 'black', mr: 1 }}*/}
                  {/*/>*/}
                  {/*{REACTIONS[response.reaction]}*/}
                </TableCell>
                <TableCell sx={{ width: '100%', maxWidth: 200, position: 'relative', pr: 4 }}>
                  <Box
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '100%'
                    }}
                  >
                    {response.message}
                  </Box>
                  <Box sx={{ position: 'absolute', top: 0, right: 0, my: 0.5 }}>
                    <Tooltip title="Expand">
                      <IconButton size="small">
                        <SearchOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  <abbr title={response.created_at}>{format(response.created_at)}</abbr>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <Alert severity="info">
                    Feedback responses will appear here
                  </Alert>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
