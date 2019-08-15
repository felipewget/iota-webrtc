import React from 'react';
import { TrinityRingsSpinner } from 'react-epic-spinners';

const style = {
  backgroundColor: '#607D8B',
  borderRadius: '12%',
  height: '250px',
  width: '250px',
  boxShadow: '2px 2px 10px 0px rgba(0,0,0,0.59)',
};

const Spinner = () => (
  <TrinityRingsSpinner color="#33B3A6" size={125} style={style} />
);

export default Spinner;
