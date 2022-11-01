import React from 'react'

import { Skeleton } from 'antd';
import SkeletonImage from 'antd/lib/skeleton/Image';
import SkeletonInput from 'antd/lib/skeleton/Input';
import SkeletonButton from 'antd/lib/skeleton/Button';

import '../../styles/skeleton/SkeletonFeedback.css';

const SkeletonFeedback = () => {
  return (
    <div className='feedback-skele'>
        <div className='feed-skele-img'>
            <SkeletonImage 
                active={true}
                />
        </div>

        <div className='form-skele'>
            <Skeleton 
                active={true} 
                paragraph={{ rows: 2 }} 
                size={"large"}
                shape={"round"} />

            <div className='input-skele'>
             <SkeletonInput active={true}></SkeletonInput>
            </div>
            <SkeletonInput active={true}></SkeletonInput>
            
            <div className='skele-btn'>
                <SkeletonButton />

            </div>
        </div>

        
         
    </div>
  )
}

export default SkeletonFeedback