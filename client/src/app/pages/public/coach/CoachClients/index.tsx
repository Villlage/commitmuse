import React from 'react'
import './styles.scss'
import { IconsSvg } from 'icons'
import PageContent from 'app/modules/common/PageContent'
import ProgressCircle from 'app/components/ProgressCircle'

export default function CoachClients() {
  const UserIcon = IconsSvg.Account
  const FileIcon = IconsSvg.FileContract
  const ArrowRightIcon = IconsSvg.ArrowRight

  //don't render the page until mock-data replaced with real data
  return null

  return (
    <article className="CoachClients-page">
      <PageContent title="Clients">
        {/*HEADER*/}
        <section className="wrapper">
          <header>
            <div className="left">
              <div>
                <span>2</span>
                <span>CLIENTS</span>
              </div>
              <div className="icon">
                <UserIcon />
              </div>
            </div>
            <div className="right">
              <div>
                <span>2</span>
                <span>PROCESSES</span>
              </div>
              <div className="icon">
                <FileIcon />
              </div>
            </div>
          </header>

          {/*CONTENT*/}
          <div className="content">
            <div className="row">
              <img src="http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png" className="avatar" />
              <div className="personalInfo">
                <div className="name">Jonah Serna</div>
                <div className="payment">Paying - 5K of 20K </div>
              </div>
              <ProgressCircle progress={50} />
              <ArrowRightIcon />
            </div>

            <div className="row">
              <img src="http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png" className="avatar" />
              <div className="personalInfo">
                <div className="name">Jonah Serna</div>
                <div className="payment">Paying - 5K of 20K </div>
              </div>
              <ProgressCircle progress={25} />
              <ArrowRightIcon />
            </div>
          </div>
        </section>
      </PageContent>
    </article>
  )
}
