import React from 'react'

import '../../styles/skeleton/SkeletonMain.css'

import { Skeleton } from 'antd';
import SkeletonButton from 'antd/lib/skeleton/Button';
import SkeletonImage from 'antd/lib/skeleton/Image';

const SkeletonComponentMain = ({type }) => {
  const classes = `skeleton ${type}`;
 
  return (
    <>
    <div className='skeletal-container'>
      <div className="intro-skele">
        <Skeleton 
          active={true} 
          paragraph={{ rows: 7 }} 
          size={"large"} />
          
          <SkeletonButton 
            active={true} 
            size={"large"}>

          </SkeletonButton>
        </div>

        <div className="image-skele">
          <div>
            <SkeletonImage 
              active={true}
              />
          </div>
        </div>
      </div>
      
    </>
    
  )
}

export default SkeletonComponentMain