import React from 'react';
import { TrinityRingsSpinner } from 'react-epic-spinners';
import { Color } from 'utils/constants';

const style = {
  backgroundColor: Color.BACKGROUND,
  borderRadius: '12%',
  height: '250px',
  width: '250px',
  boxShadow: '2px 2px 10px 0px rgba(0,0,0,0.59)',
};

const Spinner = () => (
  <TrinityRingsSpinner color={Color.PRIMARY} size={125} style={style} />
);

export default Spinner;
