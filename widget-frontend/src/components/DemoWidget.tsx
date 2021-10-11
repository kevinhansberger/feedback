import { useEffect, useRef } from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

export default function DemoWidget() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    renderFrame();
  }, []);

  const renderFrame = () => {
    const $frame = frameRef.current;

    const embedScript = document.createElement('script');
    embedScript.src = '/embed.js';

    $frame?.contentDocument?.head.appendChild(embedScript);

    const demoScript = document.createElement('script');
    demoScript.textContent = `window.WIDGET_SITE_ID = '62657d94-784c-487c-949a-5b40427a1150'; setTimeout(function(){ window.$widget.open(); }, 1500)`;

    $frame?.contentDocument?.body.appendChild(demoScript);
  };

  const handleFrameLoad = () => {
    renderFrame();
  };

  return (
    <Box
      sx={{ backgroundColor: 'primary.light', minWidth: 2000, overflow: 'hidden', position: 'relative', p: 4 }}
      style={{ height: 500 }}
    >
      <iframe
        ref={frameRef}
        title="feedback-widget-demo"
        frameBorder="0"
        onLoad={handleFrameLoad}
        style={{ width: '100%', height: 'inherit', position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      />
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs>
          <Skeleton variant="rectangular" height={48} animation={false} />
        </Grid>
        <Grid item xs={11}>
          <Skeleton variant="rectangular" height={48} animation={false} />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={3}>
          <Skeleton variant="rectangular" height={300} animation={false} />
        </Grid>
        <Grid item xs={9}>
          <Skeleton variant="rectangular" height={300} animation={false} />
        </Grid>
      </Grid>
      <Skeleton variant="rectangular" height={300} animation={false} />
    </Box>
  )
}
