import React from 'react'
import { Link } from "react-router-dom";

import Page from '../Page'

const NotFound = () => <Page name="not-found">404
  <Link to="/inicio">Voltar para Home</Link>
</Page>;

export default NotFound;
