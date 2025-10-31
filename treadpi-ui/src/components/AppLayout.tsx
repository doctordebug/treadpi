import * as React from 'react';
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import StatusComponent from './StatusComponent';
import StartStopComponent from './StartStopComponent';
import { updateStatus } from '../helper/api';
import ControllComponent from './ControllComponent';

const AppLayout = () => {


  const {data} = useQuery("status", updateStatus, {
    refetchInterval: 1000
  });

  return(      
  <div className="appLayout">
    <StatusComponent treadmillStatus={data}/>
    <ControllComponent treadmillStatus={data}/>
    <StartStopComponent/>
  </div>
)
}

export default AppLayout;