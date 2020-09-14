import React, {useState} from 'react'
import './style.scss'
import PageContent from 'app/modules/common/PageContent'
import ImgCircle from 'app/components/ImgCircle'
import Tabs from 'app/components/Tabs'
import {useSelector} from "react-redux";

const TAB_LABELS = {
  COACH_OVERVIEW: 'Coach overview',
  CLIENTS: 'Clients'
};

const Coach = () => {
  const [activeTab, setActiveTab] = useState(TAB_LABELS.COACH_OVERVIEW);

  return (
    <div className={'Coach-page'}>
      <PageContent title={'Coach'}>
        <div className={'wrapper'}>
          {/*HEADER*/}
          <div className={'header'}>
            <ImgCircle size={'small'} />
            <div className={'name'}>Amy Owens</div>
          </div>

          <Tabs
            activeTab={activeTab}
            tabs={Object.values(TAB_LABELS)}
            onChange={(tab) => setActiveTab(tab)}
          />

          {/*CONTENT*/}
          <div className={'content'}>
            {activeTab === TAB_LABELS.COACH_OVERVIEW ?
              <div className={'rows'}>
                <div className={'row'}>
                  <span className={'title'}>Total Revenue</span>
                  <div className={'value'}>
                    <span>5,000 USD</span>
                  </div>
                </div>

                <div className={'row'}>
                  <div className={'title'}>Last Payment</div>
                  <div className={'value'}>
                    <span>5,000 USD</span>
                    <span>August 8th 2020</span>
                  </div>
                </div>
              </div> :

              <h1>CLIENTS</h1>
            }
          </div>
        </div>
      </PageContent>
    </div>
  )
}

export default Coach
