import axios from 'axios';
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { Button, Button1, StyledInput } from '../styles/commonStyles'
import { BASE_URL } from '../constants';
import memoize from 'memoize-one';
import { viewTimesheets } from '../ViewTimesheets/viewTimesheets'
import Router from '../Router'
import { Link } from 'react-router-dom' 
export const AdminHome = () => {
  

  return (
    <div>
      <Router/>
    </div>
  );
};