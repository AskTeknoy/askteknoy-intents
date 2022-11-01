import React from 'react'

import '../../styles/skeleton/SkeletonChatRoom.css';
import { Skeleton } from 'antd';
import SkeletonButton from 'antd/lib/skeleton/Button';

const SkeletonChatRoom = () => {
  return (
    <div className='skele-chat-con'>
        <Skeleton 
            active={true} 
            paragraph={{ rows: 3 }} 
            size={"large"} />

        <SkeletonButton />
    </div>
  )
}

export default SkeletonChatRoom