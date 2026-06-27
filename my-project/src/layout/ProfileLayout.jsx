import React from 'react';
import { Outlet } from 'react-router-dom';
import ProfileSidebar from '../component/ProfileSidebar';

const ProfileLayout = () => {
  return (
    <div className=" px-4 py-8 bg-[#E7E1B1]">

      <div className="flex flex-col lg:flex-row gap-6 ">

        <ProfileSidebar />

        <div className="flex-1 bg-[#FBF5DD] rounded-lg shadow-md p-6">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default ProfileLayout;