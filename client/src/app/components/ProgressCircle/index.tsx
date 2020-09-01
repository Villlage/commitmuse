import React from 'react';
import './style.scss';

interface Props {
  progress: number
};

const ProgressCircle = (props: Props) => {
  const { progress } = props;

  return (
    <div className={'progressCircle'} data-progress={Math.round(progress)}>
      {/*CIRCLE*/}
      <div className={'circle'}>
        <div className={'mask full'}>
          <div className={'fill'}></div>
        </div>
        <div className={'mask half'}>
          <div className={'fill'}></div>
          <div className={'fill fix'}></div>
        </div>
      </div>

      {/*INSET*/}
      <div className={'inset'}>{`${Math.round(progress)}%`}</div>
    </div>
  )
}

export default ProgressCircle;
