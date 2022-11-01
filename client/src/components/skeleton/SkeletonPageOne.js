import React from 'react'

import SkeletonComponentMain from './SkeletonComponent'
import SkeletonFeatures from './SkeletonFeatures'
import SkeletonHowTo from './SkeletonHowTo';
import SkeletonFeedback from './SkeletonFeedback';
import SkeletonChatRoom from './SkeletonChatRoom';


const SkeletonPageOne = () => {
  return (
    <>
        <SkeletonComponentMain />
        <SkeletonFeatures />
        <SkeletonHowTo />
        <SkeletonFeedback />
        <SkeletonChatRoom />
    </>
  )
}

export default SkeletonPageOne