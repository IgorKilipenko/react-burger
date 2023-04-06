import React from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { Flex } from "@chakra-ui/react"
import { capitalizeFirstLetter } from "../../utils/string-processing"

export const IngredientsTabPanel = ({ items, onTabClick, activeTabId = items[0].id }) => {
  const [current, setCurrent] = React.useState(activeTabId)

  React.useEffect(() => {
    setCurrent(activeTabId)
  }, [activeTabId])

  const handleTabClick = (tabId) => {
    setCurrent(tabId)
    onTabClick && onTabClick(tabId)
  }

  return (
    <Flex>
      {items.map((item, i) => (
        <Tab
          key={`tab-${item.id}`}
          value={item.id}
          active={current === item.id}
          onClick={() => handleTabClick(item.id)}
        >
          {capitalizeFirstLetter(item.name)}
        </Tab>
      ))}
    </Flex>
  )
}
