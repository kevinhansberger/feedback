import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import WidgetFrame from './WidgetFrame';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Emoji from './Emoji';
import { WIDGET_BUTTON_HEIGHT, WIDGET_BUTTON_WIDTH, WIDGET_OFFSET_X, WIDGET_OFFSET_Y } from '~/constants';
import { useWidgetContext } from '~/context/widget-context';

type StyledWidgetButtonProps = {
  placement: string;
}

const StyledWidgetButton = styled('div')<StyledWidgetButtonProps>(({ theme, placement }) => ({
  position: 'fixed',
  bottom: WIDGET_OFFSET_Y,
  left: placement === 'left' ? WIDGET_OFFSET_X : 'auto',
  right: placement === 'right' ? WIDGET_OFFSET_X : 'auto',
  width: WIDGET_BUTTON_WIDTH,
  height: WIDGET_BUTTON_HEIGHT,
  zIndex: 2000,
  boxShadow: theme.shadows[12],
  borderRadius: WIDGET_BUTTON_WIDTH,
  backgroundColor: theme.palette.background.paper,
}));

export default function WidgetButton() {
  const { show, setShow, config } = useWidgetContext();

  const handleClickFab = () => {
    setShow(prev => !prev);
  }

  return (
    <StyledWidgetButton placement={config.placement}>
      <WidgetFrame name="widget-frame-button">
        <Fab
          sx={{
            boxShadow: 'none !important',
            backgroundColor: 'background.paper',
            color: 'text.secondary'
          }}
          onClick={handleClickFab}
        >
          {show ? <CloseRoundedIcon /> : <Emoji code="&#128578;" />}
        </Fab>
      </WidgetFrame>
    </StyledWidgetButton>
  )
}
