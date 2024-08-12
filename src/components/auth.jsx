/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { UserContext } from '../services/context'

export const RequireAuth = ({ children }) => {
  const { user } = useContext(UserContext)
  const location = useLocation()
  const isAuthenticated = user

  if (isAuthenticated === '') {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}
