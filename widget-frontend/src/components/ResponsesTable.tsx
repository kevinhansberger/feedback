import { useSession } from '~/context';
import { useEffect, useState } from 'react';
import { supabase } from '~/utils/supabaseClient';
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { REACTIONS } from '~/constants';

type Responses = {
  id: string;
  site_id: string;
  reaction: number;
  message: string;
  metadata: object;
  created_at: string;
}

export default function ResponsesTable() {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<Responses[]>([]);

  const fetchResponses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('fw_responses')
        .select();

      console.log(data);
      setResponses(data);

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
            <TableCell align="right">#</TableCell>
            <TableCell>Reaction</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Metadata</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responses.map((response, i) => (
            <TableRow key={response.id}>
              <TableCell align="right">{i+1}</TableCell>
              <TableCell>{REACTIONS[response.reaction]}</TableCell>
              <TableCell>{response.message}</TableCell>
              <TableCell>{JSON.stringify(response.metadata)}</TableCell>
              <TableCell>{response.created_at.substring(0, 10)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
