import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { styled } from '@mui/material/styles';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
  borderRadius: '0.625rem',
}));

const Accordion2 = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
  borderRadius: '0.625rem',
  overflow: 'hidden',
  border: '2px solid #FFFFFF',
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ExpandCircleDownIcon sx={{ fontSize: '1.5rem', color: 'white' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: '#2D3748',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(0),
  },
  borderRadius: '0.625rem',
  padding: '0 1.25rem',
  boxShadow: '0px 4px 4px 0px #00000040',
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: '1.25rem',
  borderRadius: '0.625rem',
  overflow: 'hidden',
  boxShadow: '0px 4px 4px 0px #00000040',
}));

const AccordionDetails2 = styled(MuiAccordionDetails)(() => ({
  padding: '0',
  borderRadius: '0.625rem',
  overflow: 'hidden',
  boxShadow: '0px 4px 4px 0px #00000040',
}));

const AccordionDetails3 = styled(MuiAccordionDetails)(() => ({
  padding: '0.75rem 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  borderRadius: '0.625rem',
  overflow: 'hidden',
  boxShadow: '0px 4px 4px 0px #00000040',
}));

export { Accordion, Accordion2, AccordionSummary, AccordionDetails, AccordionDetails2, AccordionDetails3 };
