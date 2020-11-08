import React, { useState } from 'react'
import { ScreenProps } from '../../../../../interfaces/baseIntefaces'
import PageContent from '../../../../modules/common/PageContent'
import Collapsible from '../../../../components/Collapsible'
import Input from '../../../../components/Input'
import { MENTORS } from '../../../../../constants/mockData'

interface MentorsGalleryProps extends ScreenProps {

}

export default function MentorsGallery(props: MentorsGalleryProps) {
  const [loading, set_loading] = useState(false)

  return <article className="MentorsGallery-page">
    <PageContent loading={loading}>
      <section className="left-sidebar">
        <Collapsible title="Category">
          <a href="#">All Categories</a>
          <a href="#">Accounting</a>
          <a href="#">Data Science</a>
          <a href="#">Engineering & Architecture</a>
          <a href="#">Design & Creative</a>
          <a href="#">Legal</a>
        </Collapsible>
        <Collapsible title="Location">
          <Input onChange={() => null} value={''} placeholder="Search location"/>
        </Collapsible>
        <Collapsible title="Pricing">
          <h2>Pricing</h2>
        </Collapsible>
        <Collapsible title="Rating">
          <h2>Rating</h2>
        </Collapsible>
        <Collapsible title="Training">
          <h2>Training</h2>
        </Collapsible>
      </section>
      <section className="members">
        <Input onChange={() => null} value={''} placeholder="Search Mentors"/>
        {MENTORS.map(mentor => (
          <MentorBox mentor={mentor} key={mentor.id} />
        ))}
      </section>
    </PageContent>
  </article>
}

function MentorBox(props: any) {
  return <h2>MemberBox</h2>
}