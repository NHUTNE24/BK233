import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { Syllabus } from '../../../../assets/data/Syllabus';

export default function LimitTags() {
  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={Syllabus}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} placeholder="Favorites" />
      )}
      sx={{ width: '500px' }}
    />
  );
}