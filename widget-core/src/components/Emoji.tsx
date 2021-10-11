import Box from '@mui/material/Box';

type Props = {
  code: string;
}

export default function Emoji(props: Props) {
  const { code } = props;

  return (
    <Box
      sx={{ fontSize: 28, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }}
      dangerouslySetInnerHTML={{ __html: code }}
    />
  )
}
