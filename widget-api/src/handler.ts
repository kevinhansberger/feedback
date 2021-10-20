import { ThrowableRouter } from 'itty-router-extras';
import { createClient } from '@supabase/supabase-js';

const router = ThrowableRouter();

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

type ValuesType = {
  reaction: number;
  message: string;
  site_id: string;
}

type SitesType = {
  id: string;
  user_id: string;
  origin: string;
  created_at: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
}

const defaultHeaders = {
  'Content-Type': 'application/json',
  ...corsHeaders
};

function handleOptions(request: Request) {
  // Make sure the necessary headers are present for this to be a valid pre-flight request
  let headers = request.headers;

  if (
    headers.get('Origin') !== null
    && headers.get('Access-Control-Request-Method') !== null
    && headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    return new Response(null, {
      status: 204,
      headers: {
        ...corsHeaders,
        // Allow all future content Request headers to go back to browser
        // such as Authorization (Bearer) or X-Client-Name-Version
        'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers')
      }
    })
  }
}

router.post('/api/responses/create', async (request: Request) => {
  const cleanOriginRegex = /^(?:https?:\/\/)?(?:www\.)?/i;
  let origin: string = request.headers.get('Origin');
  const values: ValuesType = await request.json();

  // Request validation
  if (!('reaction' in values) || !('message' in values) || !('site_id' in values)) {
    return new Response(
      JSON.stringify({
        code: 400,
        status: 'bad_request'
      }),
      {
        status: 400,
        headers: defaultHeaders,
      }
    )
  }

  // Always succeed on demo widgets with this UUID.
  if (values.site_id === '00000000-0000-0000-0000-000000000000') {
    return new Response(
      JSON.stringify({
        code: 201,
        status: 'created'
      }),
      {
        status: 201,
        headers: defaultHeaders
      }
    );
  }

  // Cleans the site_url from "http", "https", and "www" subdomain.
  origin = origin.replace(cleanOriginRegex, '');

  let siteData: SitesType;
  try {
    const { data, error } = await supabase
      .from('fw_sites')
      .select('*')
      .eq('id', values.site_id)
      .single();

    console.log(error);

    if (error) throw error;

    siteData = data;
  } catch (error) {
    return new Response(
      JSON.stringify({
        code: 400,
        status: 'invalid_site_id'
      }),
      {
        status: 400,
        headers: defaultHeaders,
      }
    );
  }

  // If origins don't match, fail silently
  if (siteData.origin !== origin) {
    return new Response(
      JSON.stringify({
        code: 201,
        status: 'created'
      }),
      {
        status: 201,
        headers: defaultHeaders,
      }
    );
  } else {
    try {
      await supabase
        .from('fw_responses')
        .insert([
          {
            reaction: values.reaction,
            message: values.message,
            site_id: siteData.id,
            metadata: {
              country: request.headers.get('cf-ipcountry'),
              id_address: request.headers.get('cf-connecting-ip'),
            }
          }
        ]);
    } catch (error) {
      return new Response(
        JSON.stringify({
          code: error.code,
          status: 'server_error'
        }),
        {
          status: error.code,
          headers: defaultHeaders,
        }
      );
    }
  }

  return new Response(
    JSON.stringify({
      code: 201,
      status: 'created'
    }),
    {
      status: 201,
      headers: defaultHeaders
    }
  );
})

router.all('*', () => {
  return new Response(
    JSON.stringify({
      code: 404,
      status: 'Not Found'
    }),
    {
      status: 404,
      headers: defaultHeaders
    });
});

export async function handleRequest(request: Request) {
  if (request.method === 'OPTIONS') {
    return handleOptions(request);
  } else {
    return router.handle(request);
  }
}
