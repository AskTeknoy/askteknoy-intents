import React from 'react'

import { Skeleton } from 'antd';
import SkeletonButton from 'antd/lib/skeleton/Button';
import SkeletonInput from 'antd/lib/skeleton/Input';

// style 
import  '../../styles/skeleton/SkeletalContact.css';

const SkeletonContact = () => {
  return (
    <>
        <div className="contact-skeletal">
            <div className='para-skeletal'>
              <Skeleton 
                active={true} 
                paragraph={{ rows: 3 }} 
                size={"large"} />
            </div>
           
            <div className='forms-skeletal'>
                <SkeletonInput active={true} />
            </div>

            <div className='form-skele-btn'>
                <SkeletonButton active={true}/>
            </div>
        </div>
    </>
  )
}

export default SkeletonContact;