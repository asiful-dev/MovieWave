import React from 'react'
import { Link } from 'react-router-dom'
import { assests } from '../../assets/assests'
import { CalendarClockIcon } from 'lucide-react'
import isoTimeFormat from "../../lib/isoTimeFormat"
import dateFormat from '../../lib/dateFormat'
const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between px-6 md:px-10 h-16 border border-white/10 bg-primary-700/10 shadow-sm backdrop-blur-md z-50 relative rounded-lg m-4">
      <Link to="/" className="flex items-center gap-2 group">
        <img
          src={assests.logo}
          alt="Admin Logo"
          className="w-36 md:w-44 h-auto transition-transform duration-200 group-hover:scale-105"
        />
      </Link>

      {/* Future admin actions (optional) */}
      <div className="flex items-center gap-4 text-sm text-white/80">
        <CalendarClockIcon className="w-5 h-5 hidden md:inline-block" />
        <p className="hidden md:inline-block">
          {dateFormat(new Date())} 
        </p>
      </div>
    </div>
  )
}

export default AdminNavbar
