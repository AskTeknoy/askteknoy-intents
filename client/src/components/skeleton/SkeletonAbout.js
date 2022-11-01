import React from 'react'

import { Skeleton } from 'antd';
import SkeletonButton from 'antd/lib/skeleton/Button';
import SkeletonInput from 'antd/lib/skeleton/Input';
import SkeletonImage from 'antd/lib/skeleton/Image';

import '../../styles/skeleton/SkeletonAbout.css';

const SkeletonAbout = () => {
  return (
    <div className='skeleton-about'>
        <div className='about-skele-title'>
            <div className='about-title'>
                <SkeletonInput  active={true} size="large" />
            </div>
            
            <Skeleton 
            active={true} 
            paragraph={{ rows: 3 }} 
            size={"large"} />
        </div>
        <div className='img-skele-team'>
            <SkeletonImage active={true}/>
            <SkeletonImage active={true}/>
            <SkeletonImage active={true}/>
            <SkeletonImage active={true}/>
            <SkeletonImage active={true}/>
        </div>
    </div>
  )
}

export default SkeletonAbout