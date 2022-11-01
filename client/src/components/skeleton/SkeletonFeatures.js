import React from 'react'

import { Skeleton } from 'antd';
import SkeletonAvatar from 'antd/lib/skeleton/Avatar';
import SkeletonInput from 'antd/lib/skeleton/Input';

import '../../styles/skeleton/SkeletonFeatures.css';

const SkeletonFeatures = () => {
  return (
    <>
        <div className="features-container-skeletal">
            <div className='title-skele'>
                <SkeletonInput />
            </div>
           
            <div className='features-skeletal'>
                <div className='skeletal-1'>
                    <SkeletonAvatar 
                        active={true}
                        size="large"
                    />  

                    <div>
                        <Skeleton 
                        active={true} 
                        paragraph={{ rows: 2 }} 
                        size={"large"}
                        shape={"round"} />
                    </div>     
                </div>
                <div className='skeletal-1'>
                    <SkeletonAvatar 
                        active={true}
                        size="large"
                    />  

                    <div>
                        <Skeleton 
                        active={true} 
                        paragraph={{ rows: 2 }} 
                        size={"large"}
                        shape={"round"} />
                    </div>     
                </div>

                <div className='skeletal-1'>
                    <SkeletonAvatar 
                        active={true}
                        size="large"
                    />  

                    <div>
                        <Skeleton 
                        active={true} 
                        paragraph={{ rows: 2 }} 
                        size={"large"}
                        shape={"round"} />
                    </div>     
                </div>
                <div className='skeletal-1'>
                    <SkeletonAvatar 
                        active={true}
                        size="large"
                    />  

                    <div>
                        <Skeleton 
                        active={true} 
                        paragraph={{ rows: 2 }} 
                        size={"large"}
                        shape={"round"} />
                    </div>     
                </div>
                <div className='skeletal-1'>
                    <SkeletonAvatar 
                        active={true}
                        size="large"
                    />  

                    <div>
                        <Skeleton 
                        active={true} 
                        paragraph={{ rows: 2 }} 
                        size={"large"}
                        shape={"round"} />
                    </div>     
                </div>
                
                <div className='skeletal-1'>
                    <SkeletonAvatar 
                        active={true}
                        size="large"
                    />  

                    <div>
                        <Skeleton 
                        active={true} 
                        paragraph={{ rows: 2 }} 
                        size={"large"}
                        shape={"round"} />
                    </div>     
                </div>
            </div>
        </div>
        
    </>
    
  )
}

export default SkeletonFeatures