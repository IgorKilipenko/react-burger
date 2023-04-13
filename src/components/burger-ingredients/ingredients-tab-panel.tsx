import React from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { Flex } from "@chakra-ui/react"
import { capitalizeFirstLetter } from "../../utils/string-processing"
import { CategoryBase as CategoryType } from "../../data"

export interface IngredientsTabPanelProps {
  items: CategoryType[]
  activeTabId?: CategoryType["id"]
  onTabClick?: (tabId: CategoryType["id"]) => void
}

export const IngredientsTabPanel = React.memo(({ items, onTabClick, activeTabId }: IngredientsTabPanelProps) => {
  const [current, setCurrent] = React.useState(activeTabId)

  React.useEffect(() => {
    setCurrent(activeTabId)
  }, [activeTabId])

  const handleTabClick = (tabId: CategoryType["id"]) => {
    setCurrent(tabId)
    onTabClick && onTabClick(tabId)
  }

  return (
    <Flex>
      {items.map((item) => (
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
})
