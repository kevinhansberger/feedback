import { ThrowableRouter } from 'itty-router-extras';
import { createClient } from '@supabase/supabase-js';

const router = ThrowableRouter();

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

const responseHeaders = {
  'Content-Type': 'application/json'
};

router.get('/responses', async () => {
  const { data } = await supabase
    .from('fw_responses')
    .select()

  return new Response(
    JSON.stringify(data),
    {
      headers: responseHeaders
    }
  );
});

router.all('*', () => {
  return new Response(
    JSON.stringify({
      code: 404,
      status: 'Not Found'
    }),
    {
      status: 404,
      headers: responseHeaders
    });
});

export async function handleRequest(request: Request) {
  return router.handle(request);
}
