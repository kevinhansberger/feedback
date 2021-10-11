import { useEffect, useState } from 'react';
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box } from '@mui/material';
import { supabase } from '~/utils/supabaseClient';
import { REACTION_EMOJIS, REACTIONS } from '~/constants';

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
        `);

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

  if (responses.length === 0) {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right" style={{ width: 1 }}>#</TableCell>
            <TableCell>Reaction</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responses.map((response, i) => (
            <TableRow key={response.id}>
              <TableCell align="right">{i+1}</TableCell>
              <TableCell>
                <Box
                  component="span"
                  dangerouslySetInnerHTML={{ __html: REACTION_EMOJIS[REACTIONS[response.reaction]] }}
                  sx={{ fontSize: '16px', color: 'black', mr: 1 }}
                />
                {REACTIONS[response.reaction]}
              </TableCell>
              <TableCell>{response.message}</TableCell>
              <TableCell>{response.created_at.substring(0, 10)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
