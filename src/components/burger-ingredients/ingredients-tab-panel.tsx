import React from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { Flex } from "@chakra-ui/react"
import { capitalizeFirstLetter } from "../../utils/string-processing"
import { CategoryBase as CategoryType } from "../../data"
import { useAppSelector } from "../../services/store"
import { getCategoriesFromProductsStore } from "../../services/slices/products"
import { OmitFlexOptions } from "../../utils/types"

export interface ContainerOptions extends OmitFlexOptions<"direction"> {}

export interface IngredientsTabPanelProps {
  activeTabId?: CategoryType["id"] | null
  onTabClick?: ((tabId: CategoryType["id"]) => boolean) | null
  options?: { container: ContainerOptions }
}

export const IngredientsTabPanel = React.memo(({ onTabClick, activeTabId, options }: IngredientsTabPanelProps) => {
  const [current, setCurrent] = React.useState(activeTabId)
  const items = useAppSelector(getCategoriesFromProductsStore)

  React.useEffect(() => {
    setCurrent(activeTabId)
  }, [activeTabId])

  const handleTabClick = (tabId: CategoryType["id"]) => {
    let preventDefault = false
    if (onTabClick) {
      preventDefault = onTabClick(tabId)
    }
    !preventDefault && setCurrent(tabId)
  }

  return (
    <Flex {...options?.container}>
      {items?.map((item) => (
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
