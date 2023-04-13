import React from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { Flex } from "@chakra-ui/react"
import { capitalizeFirstLetter } from "../../utils/string-processing"
import { CategoryBase as CategoryType } from "../../data"
import { useIngredientsContext } from "../../context/products"

export interface IngredientsTabPanelProps {
  activeTabId?: CategoryType["id"] | null
  onTabClick?: ((tabId: CategoryType["id"]) => void) | null
}

export const IngredientsTabPanel = React.memo(({ onTabClick, activeTabId }: IngredientsTabPanelProps) => {
  const [current, setCurrent] = React.useState(activeTabId)
  const { categories: items } = useIngredientsContext()

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
          active={current ? current === item.id : item === items.at(0)}
          onClick={() => handleTabClick(item.id)}
        >
          {capitalizeFirstLetter(item.name)}
        </Tab>
      ))}
    </Flex>
  )
})
