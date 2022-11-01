import React from 'react'

import { Skeleton } from 'antd';
import SkeletonImage from 'antd/lib/skeleton/Image';

import '../../styles/skeleton/SkeletalHowTo.css';

const SkeletonHowTo = () => {
  return (
    <>
       <div className="how-container">
            <div className="how-descript">
                <Skeleton 
                    active={true} 
                    paragraph={{ rows: 3 }} 
                    size={"large"} />
          
            </div>

            <div className="how-img">
                <SkeletonImage 
                active={true}
                />
            </div>
       </div> 
    </>
  )
}

export default SkeletonHowTo