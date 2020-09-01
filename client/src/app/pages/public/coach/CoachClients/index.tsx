import React from 'react'
import './styles.scss'
import { IconsSvg } from 'icons'
import PageContent from 'app/modules/common/PageContent'
import ProgressCircle from 'app/components/ProgressCircle'

const CoachClients = () => {
  const UserIcon = IconsSvg.Account
  const FileIcon = IconsSvg.FileContract
  const ArrowRightIcon = IconsSvg.ArrowRight

  return (
    <PageContent title={'Clients'}>
      <div className={'coachClients'}>
        {/*HEADER*/}
        <div className={'header'}>
          <div className={'left'}>
            <div>
              <span>2</span>
              <span>CLIENTS</span>
            </div>
            <div className={'icon'}>
              <UserIcon />
            </div>
          </div>
          <div className={'right'}>
            <div>
              <span>2</span>
              <span>PROCESSES</span>
            </div>
            <div className={'icon'}>
              <FileIcon />
            </div>
          </div>
        </div>

        {/*CONTENT*/}
        <div className={'content'}>
          <div className={'row'}>
            <img src="http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png" className={'avatar'} />
            <div className={'personalInfo'}>
              <div className={'name'}>Jonah Serna</div>
              <div className={'payment'}>Paying - 5K of 20K </div>
            </div>
            <ProgressCircle progress={50} />
            <ArrowRightIcon />
          </div>

          <div className={'row'}>
            <img src="http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png" className={'avatar'} />
            <div className={'personalInfo'}>
              <div className={'name'}>Jonah Serna</div>
              <div className={'payment'}>Paying - 5K of 20K </div>
            </div>
            <ProgressCircle progress={25} />
            <ArrowRightIcon />
          </div>
        </div>
      </div>
    </PageContent>
  )
}

export default CoachClients
