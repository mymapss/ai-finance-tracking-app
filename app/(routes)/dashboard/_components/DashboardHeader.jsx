import { UserButton } from '@clerk/nextjs';
import React from 'react';

function DashboardHeader() {
  return (
    <div className='p-5 shadow-sm border-b flex justify-between'>
      <div>
        {/* You can add a title or logo here */}
        <h1 className='text-xl font-bold'>Dashboard</h1>
      </div>
      <div>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
}

export default DashboardHeader;
