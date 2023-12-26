import React from 'react'
import { HeaderLayout } from '@strapi/design-system'
import { Link } from '@strapi/helper-plugin'
import { ArrowLeft } from '@strapi/icons'

const Navbar: React.FC = () => {
  return (
    <HeaderLayout
      id="title"
      title={'Manage Employees'}
      subtitle={'Plugin for managing employees and their'}
      navigationAction={
        <Link startIcon={<ArrowLeft />} to="/plugins/content-type-builder/">
          Back
        </Link>
      }
    />
  )
}

export default Navbar
