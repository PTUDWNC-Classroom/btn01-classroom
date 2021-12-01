import React from "react"

import StreamTabPanel from "./StreamTabPanel/StreamTabPanel"
import { tabsContext } from "../../../context/TabsContext"
import PeopleTabPanel from "./PeopleTabPanel/PeopleTabPanel"
import GradeTabPanel from "./GradeTabPanel"

export default function ClassDetails() {
  const { value } = React.useContext(tabsContext)

  return (
    <>
      <StreamTabPanel value={value} index={0} />
      <PeopleTabPanel value={value} index={2} />
      <GradeTabPanel  value={value} index={3}/>
    </>
  )
}
