import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// COMPONENTS
import Analytics from './Analytics'
import LeadDash from './leaddash/LeadDash'
import LeadManager from '../LeadManager'

const LeadMain = () => {
  return (
    <div>

      <LeadDash />
      <Analytics />
    </div>
  )
}

export default LeadMain
